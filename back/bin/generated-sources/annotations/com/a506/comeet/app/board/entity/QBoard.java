package com.a506.comeet.app.board.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = 444129060L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    public final EnumPath<com.a506.comeet.common.enums.FreeBoardCategory> category = createEnum("category", com.a506.comeet.common.enums.FreeBoardCategory.class);

    public final ListPath<Comment, QComment> comments = this.<Comment, QComment>createList("comments", Comment.class, QComment.class, PathInits.DIRECT2);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final BooleanPath isValid = createBoolean("isValid");

    public final NumberPath<Integer> likeCount = createNumber("likeCount", Integer.class);

    public final ListPath<com.a506.comeet.app.member.entity.Like, com.a506.comeet.app.member.entity.QLike> likes = this.<com.a506.comeet.app.member.entity.Like, com.a506.comeet.app.member.entity.QLike>createList("likes", com.a506.comeet.app.member.entity.Like.class, com.a506.comeet.app.member.entity.QLike.class, PathInits.DIRECT2);

    public final com.a506.comeet.app.room.entity.QRoom room;

    public final StringPath title = createString("title");

    public final EnumPath<com.a506.comeet.common.enums.BoardType> type = createEnum("type", com.a506.comeet.common.enums.BoardType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.a506.comeet.app.member.entity.QMember writer;

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new com.a506.comeet.app.room.entity.QRoom(forProperty("room"), inits.get("room")) : null;
        this.writer = inits.isInitialized("writer") ? new com.a506.comeet.app.member.entity.QMember(forProperty("writer")) : null;
    }

}

