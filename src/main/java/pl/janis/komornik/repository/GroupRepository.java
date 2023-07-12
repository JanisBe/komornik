package pl.janis.komornik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.janis.komornik.entities.Group;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    @Query(value = "select distinct g from Group g join User u where u.id = :userId")
    List<Group> findAllGroupsForUser(@Param("userId") Integer userId);

    @Query(value = "select distinct g.default_currency from `groups` g " +
            "where g.id  = :groupId", nativeQuery = true)
    String findDefaultCurrencyById(@Param("groupId") int groupId);

}