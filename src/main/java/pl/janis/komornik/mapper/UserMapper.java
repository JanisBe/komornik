package pl.janis.komornik.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import pl.janis.komornik.dto.UserDto;
import pl.janis.komornik.entities.User;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = MappingConstants.ComponentModel.SPRING)
public abstract class UserMapper {
    @Mapping(target = "verified", ignore = true)
    @Mapping(target = "verificationToken", ignore = true)
    @Mapping(target = "debtTo", ignore = true)
    @Mapping(target = "debtFrom", ignore = true)
    @Mapping(target = "groups", ignore = true)
    @Mapping(target = "password", ignore = true)
    public abstract User toEntity(UserDto userDto);

    @Mapping(target = "token", ignore = true)
    @Mapping(target = "withToken", ignore = true)
    public abstract UserDto toDto(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    public abstract User clone(User existingUser);

}
