import  express  from 'express';
import { routerProfesor } from './router/profesorRouter.js';
import routerAdmin from './router/administrativoRouter.js';
import routerMensajes from './router/mensajeRouter.js';
import routerMatricula from './router/matriculaRouter.js';
import routerMateria from './router/materiaRouter.js';
import { routerAlumno } from './router/alumnoRouter.js';
import { carreraRouter } from './router/carreraRouter.js';
// Crear el servidor
const app = express();


app.use(express.json());

app.use('/profesores', routerProfesor)
app.use('/alumnos', routerAlumno)
app.use('/admin', routerAdmin)
app.use('/mensajes', routerMensajes)
app.use('/matriculas',routerMatricula)
app.use('/materias',routerMateria)
app.use('/carreras',carreraRouter)


app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Alumnos')
});


const PUERTO = 5000


app.listen(PUERTO, () => {
    console.log(`Servidor funcionando en http://localhost:${PUERTO}`)
});
