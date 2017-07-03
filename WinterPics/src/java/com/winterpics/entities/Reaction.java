package com.winterpics.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "reaction")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Reaction.findAll", query = "SELECT r FROM Reaction r")
    , @NamedQuery(name = "Reaction.findByPublication", query = "SELECT r FROM Reaction r WHERE r.publication.id = :publication_id")
    , @NamedQuery(name = "Reaction.findById", query = "SELECT r FROM Reaction r WHERE r.id = :id")
    , @NamedQuery(name = "Reaction.findByType", query = "SELECT r FROM Reaction r WHERE r.type = :type")})
public class Reaction implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @Basic(optional = false)
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Basic(optional = false)
    @Column(name = "type", nullable = false)
    @Convert(converter = ReactionConverter.class)
    private ReactionType type;
    
    @JoinColumn(name = "publication_id", referencedColumnName = "id")
    @ManyToOne
    private Publication publication;
    
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    @ManyToOne
    private WinterUser author;

    public Reaction() {
    }

    public Reaction(Long id) {
        this.id = id;
    }

    public Reaction(Long id, ReactionType type) {
        this.id = id;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReactionType getType() {
        return type;
    }

    public void setType(ReactionType type) {
        this.type = type;
    }
    
    public Publication getPublication() {
        return publication;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
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
        if (!(object instanceof Reaction)) {
            return false;
        }
        Reaction other = (Reaction) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Reaction[ id=" + id + " ]";
    }

}
