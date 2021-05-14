package ejb.session.stateless;

import entity.Program;
import entity.User;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.transaction.UserTransaction;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import util.exception.CreateNewProgramException;
import util.exception.InputDataValidationException;
import util.exception.ProgramNotFoundException;
import util.exception.ProgramTitleExistException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author sthit
 */
@Stateless
public class ProgramSessionBean implements ProgramSessionBeanLocal {

    @EJB
    private UserEntitySessionBeanLocal userSessionBeanLocal;

    @PersistenceContext(unitName = "ChallengeTrackerApplication-ejbPU")
    private EntityManager em;
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;
    
    
    
    public ProgramSessionBean()
    {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    
    @Override
    public Long createProgram(Program program) throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException
    {
        Set<ConstraintViolation<Program>>constraintViolations = validator.validate(program);
        
        if (constraintViolations.isEmpty())
        {
            try {
                em.persist(program);
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
                    programManager.getProgramsManaging().add(program);
                }
                else
                {
                    throw new CreateNewProgramException("Program must be associated with a program manager");
                }
                                
                if (userIds != null && (!userIds.isEmpty()))
                {
                    for (Long userId : userIds)
                    {
                        User user = userSessionBeanLocal.retrieveUserByUserId(userId);
                        program.getUserList().add(user);
                        user.getEnrolledPrograms().add(program);
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
                        throw new ProgramTitleExistException("Program Title already exists");
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
            } catch (UserNotFoundException ex) {
                throw new CreateNewProgramException("Invalid User ID keyed in");
            }
        }
        else
        {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    @Override
    public List<Program> retrieveAllPrograms()
    {
        Query query = em.createNamedQuery("Program.findAll");
        return query.getResultList();
    }
    
    @Override
     public Program retrieveProgramByProgramId(Long programId) throws ProgramNotFoundException
    {
       
        Program program = em.find(Program.class, programId);
        
        if(program != null)
        {
            return program;
        }
        else
        {
            throw new ProgramNotFoundException("Program ID " + programId + " does not exist!");
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
