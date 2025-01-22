package com.forohub.api.forohub.domain.respuesta;

import com.forohub.api.forohub.domain.ValidacionException;
import com.forohub.api.forohub.domain.topico.DatosListadoTopico;
import com.forohub.api.forohub.domain.topico.Topico;
import com.forohub.api.forohub.domain.topico.TopicoRepository;
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
import java.util.stream.Collectors;

@Service
public class RespuestaService {

    @Autowired
    private RespuestaRepository respuestaRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TopicoRepository topicoRepository;

    public Respuesta crearRespuesta(DatosRegistrarRespuesta datosRegistrarRespuesta, UUID usuarioId) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if(usuarioOpt.isPresent()){
            Usuario usuario = usuarioOpt.get();
            Optional<Topico> topicoOpt = topicoRepository.findById(datosRegistrarRespuesta.topicoId());
            if(topicoOpt.isPresent()) {
                Topico topico = topicoOpt.get();
                Respuesta respuesta = new Respuesta(datosRegistrarRespuesta, topico, usuario);
                return respuestaRepository.save(respuesta);
            }else{
                throw new RuntimeException("Topico no encontrado");
            }
        }else{
            throw  new RuntimeException("Usuario no encontrado");
        }
    }

    public DatosListadoRespuesta obtenerRespuesta(String id){
        Respuesta respuesta = respuestaRepository.findById(UUID.fromString(id)).orElseThrow(() -> new RuntimeException("Respuesta no encontrada"));
        return new DatosListadoRespuesta(respuesta, respuesta.getAutor());
    }

    public Page<DatosListadoRespuesta> obtenerRespuestaPorTopico(Pageable paginacion, UUID id) {
        return respuestaRepository.findAllByTopicoId(id, paginacion).map(respuesta -> new DatosListadoRespuesta(respuesta, respuesta.getAutor()));
    }

    @Transactional
    public Respuesta actualizarRespuesta(DatosActualizarRespuesta datosActualizarRespuesta){
        Respuesta respuesta = respuestaRepository.findById(datosActualizarRespuesta.id())
                .orElseThrow(() -> new ValidacionException("Respuesta no encontrada"));

        if (datosActualizarRespuesta.mensaje() != null) {
            respuesta.setMensaje(datosActualizarRespuesta.mensaje());
        }
        if (datosActualizarRespuesta.solucion() != null) {
            respuesta.setSolucion(datosActualizarRespuesta.solucion());
        }
        return respuestaRepository.save(respuesta);
    }

    @Transactional
    public void eliminarRespuesta(UUID id) {
        if(!respuestaRepository.existsById(id)){
            throw new ValidacionException("Respuesta no encontrada");
        }else{
            respuestaRepository.deleteById(id);
        }
    }
}
