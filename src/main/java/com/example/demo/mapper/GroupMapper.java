package com.example.demo.mapper;

import com.example.demo.dto.GroupDto;
import com.example.demo.entities.Group;
import org.mapstruct.Mapper;

@Mapper
public interface GroupMapper {

    GroupDto toDto(Group group);
}
