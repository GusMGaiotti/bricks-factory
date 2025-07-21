package com.gusgaiotti.brickfactory.exception;

public class BrickStatusChangeNotAllowedException extends RuntimeException {
    public BrickStatusChangeNotAllowedException(String currentStatus) {
        super("Status não pode ser alterado. Status atual: " + currentStatus);
    }
}