package com.a506.comeet.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -107732937L;

    public static final QBoard board = new QBoard("board");

    public final StringPath categoty = createString("categoty");

    public final StringPath context = createString("context");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> likecount = createNumber("likecount", Integer.class);

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final StringPath title = createString("title");

    public final StringPath type = createString("type");

    public final BooleanPath valid = createBoolean("valid");

    public final StringPath writerId = createString("writerId");

    public QBoard(String variable) {
        super(Board.class, forVariable(variable));
    }

    public QBoard(Path<? extends Board> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoard(PathMetadata metadata) {
        super(Board.class, metadata);
    }

}

