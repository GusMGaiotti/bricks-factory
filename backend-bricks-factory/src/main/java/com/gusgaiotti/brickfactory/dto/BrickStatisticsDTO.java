package com.gusgaiotti.brickfactory.dto;

public class BrickStatisticsDTO {
    private long whiteBricksEvenHoles;
    private long whiteBricksOddHoles;
    private long blackBricksEvenHoles;
    private long blackBricksOddHoles;
    private long whiteBricksTotal;
    private long blackBricksTotal;
    private long bricksInInspection;
    private long bricksApproved;
    private long bricksRejected;
    private long bricksDefective;


    public long getWhiteBricksEvenHoles() {
        return whiteBricksEvenHoles;
    }

    public void setWhiteBricksEvenHoles(long whiteBricksEvenHoles) {
        this.whiteBricksEvenHoles = whiteBricksEvenHoles;
    }

    public long getWhiteBricksOddHoles() {
        return whiteBricksOddHoles;
    }

    public void setWhiteBricksOddHoles(long whiteBricksOddHoles) {
        this.whiteBricksOddHoles = whiteBricksOddHoles;
    }

    public long getBlackBricksEvenHoles() {
        return blackBricksEvenHoles;
    }

    public void setBlackBricksEvenHoles(long blackBricksEvenHoles) {
        this.blackBricksEvenHoles = blackBricksEvenHoles;
    }

    public long getBlackBricksOddHoles() {
        return blackBricksOddHoles;
    }

    public void setBlackBricksOddHoles(long blackBricksOddHoles) {
        this.blackBricksOddHoles = blackBricksOddHoles;
    }

    public long getWhiteBricksTotal() {
        return whiteBricksTotal;
    }

    public void setWhiteBricksTotal(long whiteBricksTotal) {
        this.whiteBricksTotal = whiteBricksTotal;
    }

    public long getBlackBricksTotal() {
        return blackBricksTotal;
    }

    public void setBlackBricksTotal(long blackBricksTotal) {
        this.blackBricksTotal = blackBricksTotal;
    }

    public long getBricksInInspection() {
        return bricksInInspection;
    }

    public void setBricksInInspection(long bricksInInspection) {
        this.bricksInInspection = bricksInInspection;
    }

    public long getBricksApproved() {
        return bricksApproved;
    }

    public void setBricksApproved(long bricksApproved) {
        this.bricksApproved = bricksApproved;
    }

    public long getBricksRejected() {
        return bricksRejected;
    }

    public void setBricksRejected(long bricksRejected) {
        this.bricksRejected = bricksRejected;
    }

    public long getBricksDefective() {
        return bricksDefective;
    }

    public void setBricksDefective(long bricksDefective) {
        this.bricksDefective = bricksDefective;
    }
}