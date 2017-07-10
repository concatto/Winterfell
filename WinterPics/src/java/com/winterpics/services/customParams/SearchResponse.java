package com.winterpics.services.customParams;

import com.winterpics.entities.WinterUser;
import java.io.Serializable;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SearchResponse implements Serializable {
    @XmlElement
    private List<WinterUser> result;

    @XmlElement
    private long nResults;

    public SearchResponse() {
    }
    public SearchResponse(List<WinterUser> result, long nResults) {
        this.result = result;
        this.nResults = nResults;
    }
    public List<WinterUser> getResult() {
        return result;
    }
    public long getnResults() {
        return nResults;
    }
    public void setResult(List<WinterUser> result) {
        this.result = result;
    }
    public void setnResults(long nResults) {
        this.nResults = nResults;
    }
}