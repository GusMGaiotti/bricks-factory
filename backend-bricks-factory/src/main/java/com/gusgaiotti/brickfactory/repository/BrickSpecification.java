package com.gusgaiotti.brickfactory.repository;

import com.gusgaiotti.brickfactory.dto.BrickFilterRequest;
import com.gusgaiotti.brickfactory.entity.Brick;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;
import java.util.List;

public class BrickSpecification implements Specification<Brick> {

    private final BrickFilterRequest filter;

    public BrickSpecification(BrickFilterRequest filter) {
        this.filter = filter;
    }

    @Override
    public Predicate toPredicate(jakarta.persistence.criteria.Root<Brick> root, jakarta.persistence.criteria.CriteriaQuery<?> query, jakarta.persistence.criteria.CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();

        if (filter.getColor() != null) {
            predicates.add(builder.equal(root.get("color"), filter.getColor()));
        }
        if (filter.getStatus() != null) {
            predicates.add(builder.equal(root.get("status"), filter.getStatus()));
        }
        if (filter.getDefective() != null) {
            predicates.add(builder.equal(root.get("defective"), filter.getDefective()));
        }

        return builder.and(predicates.toArray(new Predicate[0]));
    }
}