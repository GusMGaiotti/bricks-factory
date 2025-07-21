package com.gusgaiotti.brickfactory.mapper;

import com.gusgaiotti.brickfactory.dto.BrickDTO;
import com.gusgaiotti.brickfactory.entity.Brick;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BrickMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "color", target = "color")
    @Mapping(source = "holes", target = "holes")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "defective", target = "defective")
    BrickDTO toDto(Brick brick);

}