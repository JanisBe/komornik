package pl.janis.komornik.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.janis.komornik.entities.Debt;
import pl.janis.komornik.repository.DebtRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class DebtService {

    private final DebtRepository debtRepository;

    public Debt save(Debt debt) {
        return debtRepository.save(debt);
    }

}
