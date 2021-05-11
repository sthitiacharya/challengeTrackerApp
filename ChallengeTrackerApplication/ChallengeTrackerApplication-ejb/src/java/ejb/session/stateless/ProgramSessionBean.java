/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Program;
import entity.User;
import java.util.List;
import java.util.Set;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import util.exception.CreateNewProgramException;
import util.exception.InputDataValidationException;
import util.exception.ProgramTitleExistException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author sthit
 */
@Stateless
public class ProgramSessionBean implements ProgramSessionBeanLocal {

    @PersistenceContext(unitName = "ChallengeTrackerApplication-ejbPU")
    private EntityManager em;
    
    @EJB(name="userSessionBeanLocal")
    private UserEntitySessionBeanLocal userSessionBeanLocal;
    

    private final ValidatorFactory validatorFactory;
    private final Validator validator;
    
    
    
    public ProgramSessionBean()
    {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    /* public void persist(Object object) {
        try {
            Context ctx = new InitialContext();
            UserTransaction utx = (UserTransaction) ctx.lookup("java:comp/env/UserTransaction");
            utx.begin();
            EntityManager em = (EntityManager) ctx.lookup("java:comp/env/persistence/LogicalName");
            em.persist(object);
            utx.commit();
        } catch (Exception e) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", e);
            throw new RuntimeException(e);
        }
    }
    */

    @Override
    public Long createProgram(Program program) throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException
    {
        Set<ConstraintViolation<Program>>constraintViolations = validator.validate(program);
        
        if (constraintViolations.isEmpty())
        {
            try {
            //Context ctx = new InitialContext();
            //UserTransaction utx = (UserTransaction) ctx.lookup("java:comp/env/UserTransaction");
            //utx.begin();
            //EntityManager em = (EntityManager) ctx.lookup("java:comp/env/persistence/LogicalName");
                em.persist(program);
                em.flush();
                //utx.commit();
                return program.getProgramId();
            }
            catch (PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException"))
                {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new ProgramTitleExistException();
                    }
                    else
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                }
                else
                {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            //} catch (Exception e) {
            //    Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", e);
            //    throw new RuntimeException(e);
            }
        }
        else
        {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    @Override
    public Long createProgram(Program program, Long programManagerId, List<Long> userIds) throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException, CreateNewProgramException
    {
        Set<ConstraintViolation<Program>>constraintViolations = validator.validate(program);
        
        if (constraintViolations.isEmpty())
        {
            try {
                if (programManagerId != null)
                {
                    User programManager = userSessionBeanLocal.retrieveUserByUserId(programManagerId);
                    em.persist(program);
                    program.setProgramManager(programManager);
                    programManager.getProgramCollection().add(program);
                }
                else
                {
                    throw new CreateNewProgramException("Program must be associated with a program manager");
                }
                
                
                if ((!userIds.isEmpty()) && userIds != null)
                {
                    for (Long userId : userIds)
                    {
                        User user = userSessionBeanLocal.retrieveUserByUserId(userId);
                        
                    }
                }

                em.flush();
                return program.getProgramId();
            }
            catch (PersistenceException ex)
            {
                if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException"))
                {
                    if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                    {
                        throw new ProgramTitleExistException();
                    }
                    else
                    {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                }
                else
                {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            //} catch (Exception e) {
            //    Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", e);
            //    throw new RuntimeException(e);
            } catch (UserNotFoundException ex) {
                throw new CreateNewProgramException();
            }
        }
        else
        {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Program>>constraintViolations)
    {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations)
        {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        
        return msg;
    }
    
}
