package com.gusgaiotti.brickfactory.controller;


import com.gusgaiotti.brickfactory.dto.*;
import com.gusgaiotti.brickfactory.entity.Brick;
import com.gusgaiotti.brickfactory.mapper.BrickMapper;
import com.gusgaiotti.brickfactory.service.BrickService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/bricks")
@CrossOrigin(origins = {"http://localhost:3000"})
public class BrickController {


    private final BrickService brickService;
    private final BrickMapper brickMapper;


    public BrickController(BrickService brickService, BrickMapper brickMapper) {
        this.brickService = brickService;
        this.brickMapper = brickMapper;
    }


    @GetMapping
    public ResponseEntity<Page<BrickDTO>> findBricks(
            @PageableDefault(size = 10, sort = "id") Pageable pageable,
            @ModelAttribute BrickFilterRequest filters) {


        Page<Brick> brickPage = brickService.findBricks(filters, pageable);
        Page<BrickDTO> brickDtoPage = brickPage.map(brickMapper::toDto);
        return ResponseEntity.ok(brickDtoPage);
    }


    @GetMapping("/statistics")
    public ResponseEntity<BrickStatisticsDTO> getStatistics() {
        return ResponseEntity.ok(brickService.getStatistics());
    }


    @GetMapping("/{id}")
    public ResponseEntity<BrickDTO> getBrickById(@PathVariable Long id) {
        return brickService.getBrickById(id)
                .map(brickMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<BrickDTO> createBrick(@Valid @RequestBody CreateBrickRequest request) {
        Brick brick = brickService.createBrick(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(brickMapper.toDto(brick));
    }


    @PostMapping("/random")
    public ResponseEntity<BrickDTO> createRandomBrick() {
        Brick brick = brickService.createRandomBrick();
        return ResponseEntity.status(HttpStatus.CREATED).body(brickMapper.toDto(brick));
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<BrickDTO> updateBrickStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {


        Brick updatedBrick = brickService.updateBrickStatus(id, request.getStatus());
        return ResponseEntity.ok(brickMapper.toDto(updatedBrick));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrick(@PathVariable Long id) {
        brickService.deleteBrick(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/enums/colors")
    public ResponseEntity<Brick.Color[]> getColors() {
        return ResponseEntity.ok(Brick.Color.values());
    }


    @GetMapping("/enums/statuses")
    public ResponseEntity<Brick.Status[]> getStatuses() {
        return ResponseEntity.ok(Brick.Status.values());
    }
}
