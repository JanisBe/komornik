package pl.janis.komornik.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.janis.komornik.entities.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("select u from User u join u.groups groups where groups.id = :groupId")
    List<User> findUsersInGroups(@Param("groupId") Integer groupId);


    User findByName(String name);

    @Query(value = "select distinct u.* from user_x_group uxg " +
            "left join  users u on u.id = uxg.user_id " +
            "where uxg.group_id in (select uxg2.group_id from user_x_group uxg2 " +
            "                       where uxg2.user_id = :userId)", nativeQuery = true)
    List<User> findCommonUsers(@Param("userId") int userId);

    User findByNameAndMail(String name, String mail);

    User findByMail(String mail);
}
