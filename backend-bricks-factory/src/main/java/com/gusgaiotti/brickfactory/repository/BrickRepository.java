package com.gusgaiotti.brickfactory.repository;


import com.gusgaiotti.brickfactory.entity.Brick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor; // Adicionado
import org.springframework.stereotype.Repository;


@Repository
public interface BrickRepository extends JpaRepository<Brick, Long>, JpaSpecificationExecutor<Brick> {
    long countByStatus(Brick.Status status);
    long countByColor(Brick.Color color);
    long countByDefectiveTrue();
}
