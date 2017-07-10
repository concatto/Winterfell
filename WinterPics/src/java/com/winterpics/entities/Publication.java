package com.winterpics.entities;

import java.io.Serializable;
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
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name = "publication")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Publication.findAll", query = "SELECT p FROM Publication p")
    , @NamedQuery(name = "Publication.findById", query = "SELECT p FROM Publication p WHERE p.id = :id")
    , @NamedQuery(name = "Publication.findByImagepath", query = "SELECT p FROM Publication p WHERE p.imagepath = :imagepath")
    , @NamedQuery(name = "Publication.findByMoment", query = "SELECT p FROM Publication p WHERE p.moment = :moment")
    , @NamedQuery(name = "Publication.findByTitle", query = "SELECT p FROM Publication p WHERE p.title = :title")})
public class Publication implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @Basic(optional = false)
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Basic(optional = false)
    @Column(name = "imagepath", nullable = false, length = 255)
    private String imagepath;
    
    @Column(name = "moment")
    @Temporal(TemporalType.TIMESTAMP)
    private Date moment;
    
    @Column(name = "title", length = 150)
    private String title;
    
    @OneToMany(mappedBy = "publication", cascade = CascadeType.REMOVE)
    private List<Reaction> reactions;
    
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    @ManyToOne
    private WinterUser author;

    public Publication() {
    }

    public Publication(Long id) {
        this.id = id;
    }

    public Publication(Long id, String imagepath) {
        this.id = id;
        this.imagepath = imagepath;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public Date getMoment() {
        return moment;
    }

    public void setMoment(Date moment) {
        this.moment = moment;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @XmlTransient
    public List<Reaction> getReactions() {
        return reactions;
    }

    public void setReactions(List<Reaction> reactions) {
        this.reactions = reactions;
    }
    
//    @XmlElement(name = "reactions_resume")
    
    @Transient
    @XmlElement
    ReactionResume reactionResume = null;

    public ReactionResume getReactionResume() {
        return reactionResume;
    }

    public void setReactionResume(ReactionResume reactionResume) {
        this.reactionResume = reactionResume;
    }
    
    public void loadReactionResume(WinterUser winterUser){
        reactionResume = new ReactionResume(this, winterUser);
    }

    
    
    public WinterUser getAuthor() {
        return author;
    }

    public void setAuthor(WinterUser author) {
        this.author = author;
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
        if (!(object instanceof Publication)) {
            return false;
        }
        Publication other = (Publication) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Publication[ id=" + id + " ]";
    }

}
