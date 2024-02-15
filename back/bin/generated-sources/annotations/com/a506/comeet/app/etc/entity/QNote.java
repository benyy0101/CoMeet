package com.a506.comeet.app.etc.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNote is a Querydsl query type for Note
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNote extends EntityPathBase<Note> {

    private static final long serialVersionUID = -1320834718L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNote note = new QNote("note");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    public final StringPath context = createString("context");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final BooleanPath isRead = createBoolean("isRead");

    public final com.a506.comeet.app.member.entity.QMember receiver;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.a506.comeet.app.member.entity.QMember writer;

    public QNote(String variable) {
        this(Note.class, forVariable(variable), INITS);
    }

    public QNote(Path<? extends Note> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNote(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNote(PathMetadata metadata, PathInits inits) {
        this(Note.class, metadata, inits);
    }

    public QNote(Class<? extends Note> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.receiver = inits.isInitialized("receiver") ? new com.a506.comeet.app.member.entity.QMember(forProperty("receiver")) : null;
        this.writer = inits.isInitialized("writer") ? new com.a506.comeet.app.member.entity.QMember(forProperty("writer")) : null;
    }

}

