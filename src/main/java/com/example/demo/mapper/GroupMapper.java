package com.example.demo.mapper;

import com.example.demo.dto.GroupDto;
import com.example.demo.entities.Group;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public interface GroupMapper {

    GroupDto toDto(Group group);
}
