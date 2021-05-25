/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.User;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import util.exception.InputDataValidationException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;
import util.exception.UserUsernameExistException;

/**
 *
 * @author sthit
 */
@Stateless
public class UserEntitySessionBean implements UserEntitySessionBeanLocal {
    
    @PersistenceContext(unitName = "ChallengeTrackerApplication-ejbPU")
    private EntityManager em;
    
    private final ValidatorFactory validatorFactory;
    private final Validator validator;

    public UserEntitySessionBean() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }


    @Override
    public Long createNewUser(User newUserEntity) throws UserUsernameExistException, UnknownPersistenceException, InputDataValidationException {
        Set<ConstraintViolation<User>> constraintViolations = validator.validate(newUserEntity);

        if (constraintViolations.isEmpty()) {
            try {

                em.persist(newUserEntity);
                em.flush();

                return newUserEntity.getUserId();
            } catch (PersistenceException ex) {
                if (ex.getCause() != null && ex.getCause().getClass().getName().equals("org.eclipse.persistence.exceptions.DatabaseException")) {
                    if (ex.getCause().getCause() != null && ex.getCause().getCause().getClass().getName().equals("java.sql.SQLIntegrityConstraintViolationException")) {
                        throw new UserUsernameExistException();
                    } else {
                        throw new UnknownPersistenceException(ex.getMessage());
                    }
                } else {
                    throw new UnknownPersistenceException(ex.getMessage());
                }
            }
        } else {
            throw new InputDataValidationException(prepareInputDataValidationErrorsMessage(constraintViolations));
        }
    }
    
    @Override
    public List<User> retrieveAllUsers()
    {
        //Query query = em.createQuery("SELECT u FROM User u");
        Query query = em.createNamedQuery("User.findAll");
        return query.getResultList();
    }
    
    @Override
    public User retrieveUserByUserId(Long userId) throws UserNotFoundException
    {
       
        User userEntity = em.find(User.class, userId);
        
        if(userEntity != null)
        {
            return userEntity;
        }
        else
        {
            throw new UserNotFoundException("User ID " + userId + " does not exist!");
        }
    }
    
    private String prepareInputDataValidationErrorsMessage(Set<ConstraintViolation<User>> constraintViolations) {
        String msg = "Input data validation error!:";

        for (ConstraintViolation constraintViolation : constraintViolations) {
            msg += "\n\t" + constraintViolation.getPropertyPath() + " - " + constraintViolation.getInvalidValue() + "; " + constraintViolation.getMessage();
        }
        return msg;
    }
}
