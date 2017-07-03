package com.winterpics.entities;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class ReactionConverter implements AttributeConverter<ReactionType,Integer>  {

    @Override
    public Integer convertToDatabaseColumn(ReactionType attribute) {
        return attribute.getReactionCode();
    }

    @Override
    public ReactionType convertToEntityAttribute(Integer dbData) {
        return ReactionType.fromReactionCode(dbData);
    }

}
