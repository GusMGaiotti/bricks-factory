package com.gusgaiotti.brickfactory.service;


import com.gusgaiotti.brickfactory.dto.BrickFilterRequest;
import com.gusgaiotti.brickfactory.dto.BrickStatisticsDTO;
import com.gusgaiotti.brickfactory.dto.CreateBrickRequest;
import com.gusgaiotti.brickfactory.entity.Brick;
import com.gusgaiotti.brickfactory.exception.BrickDeletionNotAllowedException;
import com.gusgaiotti.brickfactory.exception.BrickNotFoundException;
import com.gusgaiotti.brickfactory.exception.BrickStatusChangeNotAllowedException;
import com.gusgaiotti.brickfactory.repository.BrickRepository;
import com.gusgaiotti.brickfactory.repository.BrickSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
import java.util.Random;


@Service
@Transactional
public class BrickService {


    private final BrickRepository brickRepository;
    private final Random random = new Random();


    public BrickService(BrickRepository brickRepository) {
        this.brickRepository = brickRepository;
    }


    public Optional<Brick> getBrickById(Long id) {
        return brickRepository.findById(id);
    }


    public Brick createBrick(CreateBrickRequest request) {
        Brick brick = new Brick(request.getColor(), request.getHoles());
        return brickRepository.save(brick);
    }


    public Brick createRandomBrick() {
        Brick.Color randomColor = random.nextBoolean() ? Brick.Color.BRANCO : Brick.Color.PRETO;
        String randomHoles = String.valueOf(random.nextInt(8) + 1);
        Brick brick = new Brick(randomColor, randomHoles);
        return brickRepository.save(brick);
    }


    public Page<Brick> findBricks(BrickFilterRequest filters, Pageable pageable) {
        return brickRepository.findAll(new BrickSpecification(filters), pageable);
    }


    public Brick updateBrickStatus(Long id, Brick.Status newStatus) {
        Brick brick = brickRepository.findById(id)
                .orElseThrow(() -> new BrickNotFoundException(id));


        if (!brick.canChangeStatus()) {
            throw new BrickStatusChangeNotAllowedException(brick.getStatus().toString());
        }


        brick.setStatus(newStatus);
        if (newStatus == Brick.Status.APROVADO && random.nextInt(3) == 0) {
            brick.setDefective(true);
        }
        return brickRepository.save(brick);
    }


    public void deleteBrick(Long id) {
        Brick brick = brickRepository.findById(id)
                .orElseThrow(() -> new BrickNotFoundException(id));


        if (!brick.canBeDeleted()) {
            throw new BrickDeletionNotAllowedException();
        }
        brickRepository.delete(brick);
    }


    public BrickStatisticsDTO getStatistics() {
        BrickStatisticsDTO stats = new BrickStatisticsDTO();


        stats.setBricksApproved(brickRepository.countByStatus(Brick.Status.APROVADO));
        stats.setBricksRejected(brickRepository.countByStatus(Brick.Status.REPROVADO));
        stats.setBricksInInspection(brickRepository.countByStatus(Brick.Status.EM_INSPECAO));
        stats.setBricksDefective(brickRepository.countByDefectiveTrue());
        stats.setWhiteBricksTotal(brickRepository.countByColor(Brick.Color.BRANCO));
        stats.setBlackBricksTotal(brickRepository.countByColor(Brick.Color.PRETO));


        BrickFilterRequest whiteFilter = new BrickFilterRequest();
        whiteFilter.setColor(Brick.Color.BRANCO);
        Page<Brick> whiteBricks = brickRepository.findAll(new BrickSpecification(whiteFilter), Pageable.unpaged());
        long whiteEven = whiteBricks.getContent().stream().filter(Brick::hasEvenHoles).count();
        stats.setWhiteBricksEvenHoles(whiteEven);
        stats.setWhiteBricksOddHoles(stats.getWhiteBricksTotal() - whiteEven);


        BrickFilterRequest blackFilter = new BrickFilterRequest();
        blackFilter.setColor(Brick.Color.PRETO);
        Page<Brick> blackBricks = brickRepository.findAll(new BrickSpecification(blackFilter), Pageable.unpaged());
        long blackEven = blackBricks.getContent().stream().filter(Brick::hasEvenHoles).count();
        stats.setBlackBricksEvenHoles(blackEven);
        stats.setBlackBricksOddHoles(stats.getBlackBricksTotal() - blackEven);


        return stats;
    }


    public void initializeBricks() {
        if (brickRepository.count() == 0) {
            for (int i = 0; i < 100; i++) {
                createRandomBrick();
            }
        }
    }
}
