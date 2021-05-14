/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.User;
import java.util.List;
import javax.ejb.Local;
import util.exception.InputDataValidationException;
import util.exception.UnknownPersistenceException;
import util.exception.UserNotFoundException;
import util.exception.UserUsernameExistException;

/**
 *
 * @author sthit
 */
@Local
public interface UserEntitySessionBeanLocal {
    
    public List<User> retrieveAllUsers();
    
    public User retrieveUserByUserId(Long userId) throws UserNotFoundException;

    public Long createNewUser(User newUserEntity) throws UserUsernameExistException, UnknownPersistenceException, InputDataValidationException;
    
}
