package pl.janis.komornik.entities;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserBalance implements Comparable<UserBalance> {
    private int userId;
    private BigDecimal balance;

    @Override
    public int compareTo(UserBalance ub) {
        return ub.getBalance().compareTo(this.balance);
    }

}
