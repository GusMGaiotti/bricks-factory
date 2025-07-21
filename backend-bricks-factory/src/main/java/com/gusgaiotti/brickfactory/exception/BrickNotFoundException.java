
package com.gusgaiotti.brickfactory.exception;

public class BrickNotFoundException extends RuntimeException {

    public BrickNotFoundException(Long id) {
        super("Tijolo não encontrado com id: " + id);
    }
}