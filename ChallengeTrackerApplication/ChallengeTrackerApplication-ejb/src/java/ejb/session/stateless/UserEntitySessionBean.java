/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.User;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import util.exception.UserNotFoundException;

/**
 *
 * @author sthit
 */
@Stateless
public class UserEntitySessionBean implements UserEntitySessionBeanLocal {
    
    @PersistenceContext(unitName = "ChallengeTrackerApplication-ejbPU")
    private EntityManager em;
    
    
    @Override
    public List<User> retrieveAllUsers()
    {
        Query query = em.createQuery("SELECT u FROM User u");
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
}
