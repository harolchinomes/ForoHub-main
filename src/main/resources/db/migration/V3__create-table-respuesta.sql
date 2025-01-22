CREATE TABLE respuestas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mensaje TEXT NOT NULL,
    topico_id UUID,
    fecha_creacion TIMESTAMP NOT NULL,
    autor_id UUID,
    solucion BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_topico_respuesta FOREIGN KEY(topico_id) REFERENCES topicos(id),
    CONSTRAINT fk_usuario_respuesta FOREIGN KEY(autor_id) REFERENCES usuarios(id)
);