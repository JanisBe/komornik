package pl.janis.komornik.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.janis.komornik.dto.DebtDto;
import pl.janis.komornik.entities.Debt;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;

@Mapper(unmappedTargetPolicy = ReportingPolicy.WARN, componentModel = SPRING)
public abstract class DebtMapper {

    @Mapping(target = "expense", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userTo", source = "to")
    @Mapping(target = "userFrom", source = "from")
    abstract Debt toEntity(DebtDto debtDto);

    @Mapping(target = "to", source = "userTo")
    @Mapping(target = "from", source = "userFrom")
    @Mapping(target = "to.withToken", ignore = true)
    @Mapping(target = "to.token", ignore = true)
    @Mapping(target = "from.withToken", ignore = true)
    @Mapping(target = "from.token", ignore = true)
    abstract DebtDto toDto(Debt debt);
}
