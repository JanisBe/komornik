package pl.janis.komornik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.janis.komornik.entities.Debt;

public interface DebtRepository extends JpaRepository<Debt, Integer> {
}
