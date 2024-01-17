package com.a506.comeet.common;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBaseEntityWithSoftDelete is a Querydsl query type for BaseEntityWithSoftDelete
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QBaseEntityWithSoftDelete extends EntityPathBase<BaseEntityWithSoftDelete> {

    private static final long serialVersionUID = -1185175266L;

    public static final QBaseEntityWithSoftDelete baseEntityWithSoftDelete = new QBaseEntityWithSoftDelete("baseEntityWithSoftDelete");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QBaseEntityWithSoftDelete(String variable) {
        super(BaseEntityWithSoftDelete.class, forVariable(variable));
    }

    public QBaseEntityWithSoftDelete(Path<? extends BaseEntityWithSoftDelete> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBaseEntityWithSoftDelete(PathMetadata metadata) {
        super(BaseEntityWithSoftDelete.class, metadata);
    }

}

