package com.forohub.api.forohub.domain.topico;

import com.forohub.api.forohub.domain.ValidacionException;
import com.forohub.api.forohub.domain.curso.Curso;
import com.forohub.api.forohub.domain.curso.CursoRepository;
import com.forohub.api.forohub.domain.respuesta.Respuesta;
import com.forohub.api.forohub.domain.respuesta.RespuestaRepository;
import com.forohub.api.forohub.domain.usuario.Usuario;
import com.forohub.api.forohub.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TopicoService {

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private RespuestaRepository respuestaRepository;

    @Transactional
    public Topico crearTopico(DatosRegistrarTopico datosCrearTopico, UUID usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ValidacionException("Usuario no encontrado"));
        Curso curso = cursoRepository.findById(datosCrearTopico.cursoId())
                .orElseThrow(() -> new ValidacionException("Curso no encontrado"));
        Topico topico = new Topico(datosCrearTopico, usuario, curso);
        return topicoRepository.save(topico);
    }

    public Page<DatosListadoTopico> listarTopicos(Pageable paginacion) {
        return topicoRepository.findAll(paginacion).map(topico -> new DatosListadoTopico(topico, topico.getCurso()));
    }

    public DatosListadoTopico obtenerTopico(String id) {
        Topico topico = topicoRepository.findById(UUID.fromString(id)).orElseThrow(() -> new ValidacionException("Topico no encontrado"));
//        Curso curso = cursoRepository.findById(topico.getCursoId()).orElseThrow(() -> new ValidacionException("Curso no encontrado"));
        return new DatosListadoTopico(topico, topico.getCurso());
    }

    public Page<DatosListadoTopico> listarTopicosPorUsuario(Pageable paginacion, UUID usuarioId) {
        return topicoRepository.findAllByUsuarioId(usuarioId, paginacion).map(topico -> new DatosListadoTopico(topico, topico.getCurso()));
    }

    @Transactional
    public Topico actualizarTopico(DatosActualizarTopico datosActualizarTopico) {
        Topico topico = topicoRepository.findById(datosActualizarTopico.id())
                .orElseThrow(() -> new ValidacionException("Topico no encontrado"));

        if (datosActualizarTopico.titulo() != null) {
            topico.setTitulo(datosActualizarTopico.titulo());
        }
        if (datosActualizarTopico.mensaje() != null) {
            topico.setMensaje(datosActualizarTopico.mensaje());
        }
        if (datosActualizarTopico.cursoId() != null) {
            Curso curso = cursoRepository.findById(datosActualizarTopico.cursoId())
                    .orElseThrow(() -> new ValidacionException("Curso no encontrado"));
            topico.setCursoId(datosActualizarTopico.cursoId());
        }
        return topicoRepository.save(topico);
    }

    @Transactional
    public void eliminarTopico(UUID id) {
        if(!topicoRepository.existsById(id)){
            throw new ValidacionException("Topico no encontrado");
        }else{
            topicoRepository.deleteById(id);
        }
    }
}
