package com.forohub.api.forohub.controller;

import com.forohub.api.forohub.domain.perfil.DatosRegistrarPerfil;
import com.forohub.api.forohub.domain.perfil.DatosRespuestaPerfil;
import com.forohub.api.forohub.domain.perfil.Perfil;
import com.forohub.api.forohub.domain.perfil.PerfilService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;

    @PostMapping("/{id}/crear-perfil")
    public ResponseEntity<DatosRespuestaPerfil> registrarPerfil(@PathVariable UUID id, @RequestBody @Valid  DatosRegistrarPerfil datosRegistrarPerfil) {
        Perfil perfil = perfilService.crearPerfil(id,datosRegistrarPerfil.nombre());
        DatosRespuestaPerfil datosRespuestaPerfil = new DatosRespuestaPerfil(perfil.getId(),perfil.getNombre());
        return ResponseEntity.ok(datosRespuestaPerfil);
    }
}
