/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws.datamodel;

import entity.Program;
import java.util.List;

/**
 *
 * @author sthit
 */
public class CreateProgramReq {
    private Program program;
    private Long userId;
    private List<Long> userIds;

    public CreateProgramReq() {
    }

    public CreateProgramReq(Program program, Long userId, List<Long> userIds) {
        this.program = program;
        this.userId = userId;
        this.userIds = userIds;
    }

    /**
     * @return the program
     */
    public Program getProgram() {
        return program;
    }

    /**
     * @param program the program to set
     */
    public void setProgram(Program program) {
        this.program = program;
    }

    /**
     * @return the userId
     */
    public Long getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    /**
     * @return the userIds
     */
    public List<Long> getUserIds() {
        return userIds;
    }

    /**
     * @param userIds the userIds to set
     */
    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }

}
