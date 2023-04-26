package com.example.demo.mapper;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    @Mapping(target = "groups", ignore = true)
    User toEntity(UserDto userDto);

    UserDto toDto(User user);

    @Mapping(target = "groups", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(UserDto userDto, @MappingTarget User user);
}