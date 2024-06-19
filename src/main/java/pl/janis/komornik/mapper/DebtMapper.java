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
    @Mapping(target = "userTo", source = "to")
    @Mapping(target = "userFrom", source = "from")
    @Mapping(target = "userFrom.password", ignore = true)
    @Mapping(target = "userFrom.verificationToken", ignore = true)
    @Mapping(target = "userFrom.isVerified", ignore = true)
    @Mapping(target = "userFrom.groups", ignore = true)
    @Mapping(target = "userFrom.authorities", ignore = true)
    @Mapping(target = "userFrom.debtTo", ignore = true)
    @Mapping(target = "userFrom.debtFrom", ignore = true)
    @Mapping(target = "userTo.password", ignore = true)
    @Mapping(target = "userTo.verificationToken", ignore = true)
    @Mapping(target = "userTo.isVerified", ignore = true)
    @Mapping(target = "userTo.groups", ignore = true)
    @Mapping(target = "userTo.authorities", ignore = true)
    @Mapping(target = "userTo.debtTo", ignore = true)
    @Mapping(target = "userTo.debtFrom", ignore = true)
    abstract Debt toEntity(DebtDto debtDto);

    @Mapping(target = "to", source = "userTo")
    @Mapping(target = "from", source = "userFrom")
    @Mapping(target = "to.withToken", ignore = true)
    @Mapping(target = "to.token", ignore = true)
    @Mapping(target = "from.withToken", ignore = true)
    @Mapping(target = "from.token", ignore = true)
    abstract DebtDto toDto(Debt debt);
}
