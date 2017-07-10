package com.winterpics.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Query;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "winteruser")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WinterUser.findAll", query = "SELECT w FROM WinterUser w")
    , @NamedQuery(name = "WinterUser.findById", query = "SELECT w FROM WinterUser w WHERE w.id = :id")
    , @NamedQuery(name = "WinterUser.findByEmail", query = "SELECT w FROM WinterUser w WHERE w.email = :email")
    , @NamedQuery(name = "WinterUser.findByLogin", query = "SELECT w FROM WinterUser w WHERE w.login = :login")
    , @NamedQuery(name = "WinterUser.findByName", query = "SELECT w FROM WinterUser w WHERE w.name = :name")
    , @NamedQuery(name = "WinterUser.findByPass", query = "SELECT w FROM WinterUser w WHERE w.pass = :pass")
    , @NamedQuery(name = "WinterUser.findByPhotopath", query = "SELECT w FROM WinterUser w WHERE w.photopath = :photopath")})
public class WinterUser implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Basic(optional = false)
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    
    @Basic(optional = false)
    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;
    
    @Basic(optional = false)
    @Column(name = "login", unique = true, nullable = false, length = 50)
    private String login;
    
    @Basic(optional = false)
    @Column(name = "name", nullable = false, length = 120)
    private String name;
    
    @Basic(optional = false)
    @Convert(converter = PasswordConverter.class)
    @Column(name = "pass", nullable = false, length = 40)
    private String pass;
    
    @Basic(optional = false)
    @Column(name = "photopath", nullable = false, length = 255)
    private String photopath;
    
    // talvez tenha que ser invertido
    @JoinTable(name = "winteruser_winteruser", joinColumns = {
        @JoinColumn(name = "winteruser_id", referencedColumnName = "id", nullable = false)}, inverseJoinColumns = {
        @JoinColumn(name = "following_id", referencedColumnName = "id", nullable = false)})
    @ManyToMany
    private List<WinterUser> following;
    
//    @ManyToMany(mappedBy = "following")
//    private List<Publication> followingPublications;
    
    @OneToMany(mappedBy = "author")
    private List<Reaction> reactions;
    
    @OneToMany(mappedBy = "author")
    private List<Publication> publications;

    public WinterUser() {
    }

    public WinterUser(Long id) {
        this.id = id;
    }

    public WinterUser(Long id, String email, String login, String name, String pass, String photopath) {
        this.id = id;
        this.email = email;
        this.login = login;
        this.name = name;
        this.pass = pass;
        this.photopath = photopath;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getPhotopath() {
        return photopath;
    }

    public void setPhotopath(String photopath) {
        this.photopath = photopath;
    }

    @XmlTransient
    public List<WinterUser> getFollowing() {
        return following;
    }

    public void setFollowing(List<WinterUser> following) {
        this.following = following;
    }

    @Transient
    public int getnFollowing(){
        return following.size();
    }
    void setnFollowing(int n){}
    
    @Transient
    public long getnPublications(){
        try {
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            return (long) em.createQuery("SELECT COUNT(p) FROM Publication p WHERE p.author=:user")
                    .setParameter("user", this).getSingleResult();
        } catch (Exception e){
            e.printStackTrace();
        }
        return 0;
    }
    void setnPublications(long n){}
    
    @Transient
    Boolean isFollowing = null;
    
    @Transient
    public Boolean getisFollowing(){
        return isFollowing;
    }
    public void setisFollowing(Boolean isFollowing){
        this.isFollowing = isFollowing;
    }

    @XmlTransient
    public List<Reaction> getReactions() {
        return reactions;
    }

    public void setReactions(List<Reaction> reactionList) {
        this.reactions = reactionList;
    }

    @XmlTransient
    public List<Publication> getPublications() {
        return publications;
    }

    public void setPublications(List<Publication> publicationList) {
        this.publications = publicationList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof WinterUser)) {
            return false;
        }
        WinterUser other = (WinterUser) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Winteruser[ id=" + id + " ]";
    }

}
