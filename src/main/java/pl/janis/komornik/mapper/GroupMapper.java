package pl.janis.komornik.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;
import pl.janis.komornik.dto.GroupDto;
import pl.janis.komornik.entities.Group;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Component
@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING, uses = UserMapper.class)
public interface GroupMapper {
    @Mapping(target = "users.token", ignore = true)
    GroupDto toDto(Group group);

    @Mapping(target = "expenses", ignore = true)
    Group toEntity(GroupDto dto);
}
