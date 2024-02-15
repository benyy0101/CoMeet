package com.a506.comeet.app.etc.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTil is a Querydsl query type for Til
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTil extends EntityPathBase<Til> {

    private static final long serialVersionUID = 1897060647L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTil til = new QTil("til");

    public final com.a506.comeet.common.QBaseEntity _super = new com.a506.comeet.common.QBaseEntity(this);

    public final StringPath context = createString("context");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final com.a506.comeet.app.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QTil(String variable) {
        this(Til.class, forVariable(variable), INITS);
    }

    public QTil(Path<? extends Til> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTil(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTil(PathMetadata metadata, PathInits inits) {
        this(Til.class, metadata, inits);
    }

    public QTil(Class<? extends Til> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.a506.comeet.app.member.entity.QMember(forProperty("member")) : null;
    }

}

