package com.forohub.api.forohub.domain.perfil;

import com.forohub.api.forohub.domain.usuario.Usuario;
import com.forohub.api.forohub.domain.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Perfil crearPerfil(UUID usuarioId, String nombrePerfil){
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if(usuarioOpt.isPresent()){
            Usuario usuario = usuarioOpt.get();
            Perfil perfil = new Perfil();
            perfil.setNombre(nombrePerfil);
            perfil.getUsuarios().add(usuario);
            usuario.getPerfiles().add(perfil);
            perfilRepository.save(perfil);
            usuarioRepository.save(usuario);
            return perfil;
        }else{
            throw new RuntimeException("Usuario no encontrado");
        }
    }
}
