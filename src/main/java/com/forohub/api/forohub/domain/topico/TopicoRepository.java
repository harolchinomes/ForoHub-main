package com.forohub.api.forohub.domain.topico;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TopicoRepository extends JpaRepository<Topico, UUID> {

    Page<Topico> findAllByUsuarioId(UUID usuarioId, Pageable paginacion);
}
