package com.forohub.api.forohub.controller;

import com.forohub.api.forohub.domain.topico.DatosListadoTopico;
import com.forohub.api.forohub.domain.usuario.DatosListadoUsuario;
import com.forohub.api.forohub.domain.usuario.Usuario;
import com.forohub.api.forohub.domain.usuario.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping()
    public ResponseEntity<DatosListadoUsuario> obtenerUsurrio(HttpServletRequest request){
        Usuario usuario = (Usuario) request.getAttribute("usuario");
        if(usuarioRepository.findById(usuario.getId()).isEmpty()){
            throw new RuntimeException("Usuario no encontrado");
        }
        DatosListadoUsuario datosRespuestaUsuario = new DatosListadoUsuario(usuario);
        return ResponseEntity.ok(datosRespuestaUsuario);
    }
}
