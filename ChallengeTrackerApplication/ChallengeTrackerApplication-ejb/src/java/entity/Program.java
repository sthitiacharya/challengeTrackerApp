/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author sthit
 */
@Entity
@Table(name = "program")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Program.findAll", query = "SELECT p FROM Program p"),
    @NamedQuery(name = "Program.findByProgramId", query = "SELECT p FROM Program p WHERE p.programId = :programId"),
    @NamedQuery(name = "Program.findByTitle", query = "SELECT p FROM Program p WHERE p.title = :title"),
    @NamedQuery(name = "Program.findByDescription", query = "SELECT p FROM Program p WHERE p.description = :description"),
    @NamedQuery(name = "Program.findByStartDate", query = "SELECT p FROM Program p WHERE p.startDate = :startDate"),
    @NamedQuery(name = "Program.findByTargetCompletionDate", query = "SELECT p FROM Program p WHERE p.targetCompletionDate = :targetCompletionDate"),
    @NamedQuery(name = "Program.findByActualCompletedDate", query = "SELECT p FROM Program p WHERE p.actualCompletedDate = :actualCompletedDate"),
    @NamedQuery(name = "Program.findByCurrentProgressRate", query = "SELECT p FROM Program p WHERE p.currentProgressRate = :currentProgressRate")})
public class Program implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "programId")
    private Long programId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "title")
    private String title;
    @Size(max = 255)
    @Column(name = "description")
    private String description;
    @Column(name = "startDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Column(name = "targetCompletionDate")
    @Temporal(TemporalType.DATE)
    private Date targetCompletionDate;
    @Column(name = "actualCompletedDate")
    @Temporal(TemporalType.DATE)
    private Date actualCompletedDate;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "currentProgressRate")
    private Double currentProgressRate;
    @JoinTable(name = "programmembers", joinColumns = {
        @JoinColumn(name = "programId", referencedColumnName = "programId")}, inverseJoinColumns = {
        @JoinColumn(name = "programMember", referencedColumnName = "userId")})
    @ManyToMany
    private List<User> userList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "programId")
    private List<Milestone> milestoneList;
    @JoinColumn(name = "programManager", referencedColumnName = "userId")
    @ManyToOne(optional = false)
    private User programManager;

    public Program() {
        this.milestoneList = new ArrayList<>();
        this.userList = new ArrayList<>();
    }

    public Program(Long programId) {
        this.programId = programId;
    }

    public Program(Long programId, String title) {
        this.programId = programId;
        this.title = title;
    }

    public Program(String title, String description, Date startDate, Date targetCompletionDate) {
        this();
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.targetCompletionDate = targetCompletionDate;
    }

    public Long getProgramId() {
        return programId;
    }

    public void setProgramId(Long programId) {
        this.programId = programId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getTargetCompletionDate() {
        return targetCompletionDate;
    }

    public void setTargetCompletionDate(Date targetCompletionDate) {
        this.targetCompletionDate = targetCompletionDate;
    }

    public Date getActualCompletedDate() {
        return actualCompletedDate;
    }

    public void setActualCompletedDate(Date actualCompletedDate) {
        this.actualCompletedDate = actualCompletedDate;
    }

    public Double getCurrentProgressRate() {
        return currentProgressRate;
    }

    public void setCurrentProgressRate(Double currentProgressRate) {
        this.currentProgressRate = currentProgressRate;
    }

    @XmlTransient
    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @XmlTransient
    public List<Milestone> getMilestoneList() {
        return milestoneList;
    }

    public void setMilestoneList(List<Milestone> milestoneList) {
        this.milestoneList = milestoneList;
    }

    public User getProgramManager() {
        return programManager;
    }

    public void setProgramManager(User programManager) {
        this.programManager = programManager;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (programId != null ? programId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Program)) {
            return false;
        }
        Program other = (Program) object;
        if ((this.programId == null && other.programId != null) || (this.programId != null && !this.programId.equals(other.programId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Program[ programId=" + programId + " ]";
    }
    
}
