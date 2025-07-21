
package com.gusgaiotti.brickfactory.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Entity
@Table(name = "bricks")
public class Brick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Color color;

    @NotNull
    @Pattern(regexp = "[1-8]", message = "Número de furos deve ser entre 1 e 8")
    private String holes;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    private Boolean defective = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum Color { BRANCO, PRETO }
    public enum Status { EM_INSPECAO, APROVADO, REPROVADO }

    public Brick() {}

    public Brick(Color color, String holes) {
        this.color = color;
        this.holes = holes;
        this.status = Status.EM_INSPECAO;
        this.defective = false;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public boolean canChangeStatus() {
        return this.status == Status.EM_INSPECAO;
    }

    public boolean canBeDeleted() {
        return this.defective != null && this.defective;
    }

    public boolean hasEvenHoles() {
        try {
            return Integer.parseInt(this.holes) % 2 == 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Color getColor() { return color; }
    public void setColor(Color color) { this.color = color; }

    public String getHoles() { return holes; }
    public void setHoles(String holes) { this.holes = holes; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Boolean getDefective() { return defective; }
    public void setDefective(Boolean defective) { this.defective = defective; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}