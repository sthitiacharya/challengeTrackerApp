/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import entity.Milestone;
import entity.Program;
import entity.User;
import java.util.Set;
import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import util.exception.CreateNewMilestoneException;
import util.exception.CreateNewProgramException;
import util.exception.InputDataValidationException;
import util.exception.MilestoneTitleExistException;
import util.exception.ProgramNotFoundException;
import util.exception.ProgramTitleExistException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;

/**
 *
 * @author sthit
 */
@Stateless
public class MilestoneSessionBean implements MilestoneSessionBeanLocal {

    @PersistenceContext(unitName = "ChallengeTrackerApplication-ejbPU")
    private EntityManager entityManager;

    @EJB
    private ProgramSessionBeanLocal programSessionBeanLocal;
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;
    
    
    
    public MilestoneSessionBean()
    {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }
    

    @Override
    public Long createMilestone(Milestone newMilestone, Long programId) throws MilestoneTitleExistException, UnknownPersistenceException, CreateNewMilestoneException, InputDataValidationException
    {
        Set<ConstraintViolation<Milestone>>constraintViolations = validator.validate(newMilestone);
        try {
            if (!constraintViolations.isEmpty())
            {
                throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
            }
            if (programId != null)
            {
                Program program = programSessionBeanLocal.retrieveProgramByProgramId(programId);
                entityManager.persist(newMilestone);
                newMilestone.setProgramId(program);
                program.getMilestoneList().add(newMilestone);
            }
            else
            {
                throw new CreateNewMilestoneException("Milestone must be associated with a program");
            }

            entityManager.flush();
            return newMilestone.getMilestoneId();
        }
        catch (PersistenceException ex)
        {
            if(ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException"))
            {
                if(ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException"))
                {
                    throw new MilestoneTitleExistException("Milestone Title already exists");
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
        } catch (ProgramNotFoundException ex) {
            throw new CreateNewMilestoneException("Invalid Program ID keyed in");
        }
    }
    
     private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<Milestone>>constraintViolations)
    {
        String msg = "Input data validation error!:";
            
        for(ConstraintViolation constraintViolation:constraintViolations)
        {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        
        return msg;
    }
    
}
