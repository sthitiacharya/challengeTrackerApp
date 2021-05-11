/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejb.session.stateless;

import entity.Program;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import util.exception.CreateNewProgramException;
import util.exception.InputDataValidationException;
import util.exception.ProgramTitleExistException;
import util.exception.UnknownPersistenceException;

/**
 *
 * @author sthit
 */
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ProgramSessionBeanTest {

    private static ProgramSessionBeanLocal programSessionBeanLocal;
    
    public ProgramSessionBeanTest()
    {
    }    

    @BeforeClass
    public static void setUpClass() 
    {
        programSessionBeanLocal = lookupProgramSessionBeanLocal();
    }

    @AfterClass
    public static void tearDownClass() 
    {
    }

    @Before
    public void setUp() 
    {
    }

    @After
    public void tearDown() 
    {
    }

    @Test
    public void test01CreateProgram01() throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException, CreateNewProgramException, ParseException
    {
        String stringDate = "12-05-2021";
        String stringDate2 = "17-05-2021";
        Date date = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate);
        Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate2);
        Program expectedProgram = new Program("Title 1", "Description 1", date, date2);
        Long actualProgramId = programSessionBeanLocal.createProgram(expectedProgram, 1l, null);
        
        assertNotNull(actualProgramId);
        assertEquals(1l, actualProgramId.longValue());        
    }

    @Test(expected = ProgramTitleExistException.class)
    public void test02CreateProgram02() throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException, CreateNewProgramException, ParseException
    {
        String stringDate = "12-05-2021";
        String stringDate2 = "17-05-2021";
        Date date = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate);
        Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate2);
        Program expectedProgram = new Program("Title 1", "Description 1", date, date2);
        Long actualProgramId = programSessionBeanLocal.createProgram(expectedProgram, 1l, null);     
    }

    @Test(expected = InputDataValidationException.class)
    public void test03CreateProgram03() throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException, CreateNewProgramException, ParseException
    {
        String stringDate = "12-05-2021";
        String stringDate2 = "17-05-2021";
        Date date = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate);
        Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate2);
        Program expectedProgram = new Program("Title 1", "Description 1", date, date2);
        Long actualProgramId = programSessionBeanLocal.createProgram(expectedProgram, 1l, null);     
    }

    @Test(expected = CreateNewProgramException.class)
    public void test04CreateProgram04() throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException, CreateNewProgramException, ParseException
    {
        String stringDate = "12-05-2021";
        String stringDate2 = "17-05-2021";
        Date date = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate);
        Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate2);
        Program expectedProgram = new Program("Title 1", "Description 1", date, date2);
        Long actualProgramId = programSessionBeanLocal.createProgram(expectedProgram, 2l, null);     
    }
 
    @Test(expected = CreateNewProgramException.class)
    public void test05CreateProgram05() throws ProgramTitleExistException, UnknownPersistenceException, InputDataValidationException, CreateNewProgramException, ParseException
    {
        String stringDate = "12-05-2021";
        String stringDate2 = "17-05-2021";
        Date date = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate);
        Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(stringDate2);
        Program expectedProgram = new Program("Title 1", "Description 1", date, date2);
        Long actualProgramId = programSessionBeanLocal.createProgram(expectedProgram, null, null);     
    }
    
    private static ProgramSessionBeanLocal lookupProgramSessionBeanLocal()
    {
        try 
        {
            Context c = new InitialContext();
            //Not able to find program session bean local interface
            return (ProgramSessionBeanLocal) c.lookup("java:global/ChallengeTrackerApplication/ChallengeTrackerApplication-ejb/ProgramSessionBean!ejb.session.stateless.ProgramSessionBeanLocal");
        } 
        catch (NamingException ne)
        {
            throw new RuntimeException(ne);
        }
    }

}

