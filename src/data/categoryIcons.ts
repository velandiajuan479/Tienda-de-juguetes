// Catálogo extenso de más de 350 íconos para categorías de ToyStore
// Cada ícono está 100% verificado contra las exportaciones de Lucide React

export interface CategoryIconOption {
  name: string;
  label: string;
  category: string;
  tags: string;
}

export const CATEGORY_ICON_GROUPS = [
  'Todos',
  'Juegos y Juguetes',
  'Vehículos y Transporte',
  'Fantasía y Héroes',
  'Robótica y Ciencia',
  'Animales y Naturaleza',
  'Arte y Creatividad',
  'Música y Sonido',
  'Bebés y Primera Infancia',
  'Deportes y Aire Libre',
  'Comida y Fiestas',
  'Herramientas y Taller',
  'Hogar y Casitas',
  'Lectura y Aprendizaje',
  'Símbolos y Emociones'
] as const;

export const CATEGORY_ICONS: CategoryIconOption[] = [
  {
    "name": "ToyBrick",
    "label": "Ladrillos Lego / Construcción",
    "category": "Juegos y Juguetes",
    "tags": "lego bloques construccion piezas ensamble"
  },
  {
    "name": "Boxes",
    "label": "Caja de Bloques",
    "category": "Juegos y Juguetes",
    "tags": "bloques cubos apilables cajon"
  },
  {
    "name": "Box",
    "label": "Caja de Juguetes",
    "category": "Juegos y Juguetes",
    "tags": "caja contenedor cofre baul"
  },
  {
    "name": "Package",
    "label": "Paquete de Regalo",
    "category": "Juegos y Juguetes",
    "tags": "paquete sorpresa regalo lazo"
  },
  {
    "name": "PackageOpen",
    "label": "Caja Abierta Sorpresa",
    "category": "Juegos y Juguetes",
    "tags": "abrir unboxing sorpresa desempaque"
  },
  {
    "name": "PackagePlus",
    "label": "Caja con Nuevos Juguetes",
    "category": "Juegos y Juguetes",
    "tags": "agregar paquete envio nuevo"
  },
  {
    "name": "PackageCheck",
    "label": "Paquete Listo y Entregado",
    "category": "Juegos y Juguetes",
    "tags": "verificado listo preparado"
  },
  {
    "name": "Gamepad",
    "label": "Control Clásico de Videojuegos",
    "category": "Juegos y Juguetes",
    "tags": "consola mando videojuego arcade retro"
  },
  {
    "name": "Gamepad2",
    "label": "Mando Gamer Pro",
    "category": "Juegos y Juguetes",
    "tags": "consola gamer joystick play botones"
  },
  {
    "name": "Joystick",
    "label": "Palanca Arcade Retro",
    "category": "Juegos y Juguetes",
    "tags": "arcade maquinas fichas retro palanca"
  },
  {
    "name": "Dice1",
    "label": "Dado Cara 1",
    "category": "Juegos y Juguetes",
    "tags": "dado suerte azar juego de mesa uno"
  },
  {
    "name": "Dice2",
    "label": "Dado Cara 2",
    "category": "Juegos y Juguetes",
    "tags": "dado azar juego de mesa dos"
  },
  {
    "name": "Dice3",
    "label": "Dado Cara 3",
    "category": "Juegos y Juguetes",
    "tags": "dado azar juego de mesa tres"
  },
  {
    "name": "Dice4",
    "label": "Dado Cara 4",
    "category": "Juegos y Juguetes",
    "tags": "dado azar juego de mesa cuatro"
  },
  {
    "name": "Dice5",
    "label": "Dado Cara 5",
    "category": "Juegos y Juguetes",
    "tags": "dado azar juego de mesa cinco"
  },
  {
    "name": "Dice6",
    "label": "Dado Cara 6",
    "category": "Juegos y Juguetes",
    "tags": "dado azar juego de mesa seis"
  },
  {
    "name": "Dices",
    "label": "Par de Dados de Azar",
    "category": "Juegos y Juguetes",
    "tags": "dados juegos de mesa azar ludo"
  },
  {
    "name": "Puzzle",
    "label": "Pieza de Rompecabezas",
    "category": "Juegos y Juguetes",
    "tags": "pieza puzzle rompecabezas ingenio encajar"
  },
  {
    "name": "Shapes",
    "label": "Figuras Geométricas Didácticas",
    "category": "Juegos y Juguetes",
    "tags": "formas figuras encajar didactico circulo triangulo"
  },
  {
    "name": "Component",
    "label": "Módulo de Construcción",
    "category": "Juegos y Juguetes",
    "tags": "mecanica bloque modular repuesto pieza"
  },
  {
    "name": "Layers",
    "label": "Torre de Bloques Apilables",
    "category": "Juegos y Juguetes",
    "tags": "torre apilar niveles piezas pisos"
  },
  {
    "name": "Target",
    "label": "Tiro al Blanco / Puntería",
    "category": "Juegos y Juguetes",
    "tags": "dardos punteria diana arco flecha diana"
  },
  {
    "name": "Trophy",
    "label": "Trofeo de Campeón",
    "category": "Juegos y Juguetes",
    "tags": "copa ganador premio victoria copa oro"
  },
  {
    "name": "Award",
    "label": "Cinta de Primer Puesto",
    "category": "Juegos y Juguetes",
    "tags": "reconocimiento galardon medalla cinta"
  },
  {
    "name": "Medal",
    "label": "Medalla de Honor",
    "category": "Juegos y Juguetes",
    "tags": "medalla podio ganador olimpiadas plata oro"
  },
  {
    "name": "Crown",
    "label": "Corona Real / Princesas",
    "category": "Juegos y Juguetes",
    "tags": "rey reina princesa castillo corona tiara"
  },
  {
    "name": "Gem",
    "label": "Gema / Joya Brillante",
    "category": "Juegos y Juguetes",
    "tags": "cristal tesoro joyeria rubi esmeralda gema"
  },
  {
    "name": "Diamond",
    "label": "Diamante Precioso",
    "category": "Juegos y Juguetes",
    "tags": "diamante mineral joya lujo brillo"
  },
  {
    "name": "Sparkles",
    "label": "Polvo Mágico / Destellos",
    "category": "Juegos y Juguetes",
    "tags": "brillo magia hadas estrella chispas destello"
  },
  {
    "name": "Sparkle",
    "label": "Estrella Brillante Solitaria",
    "category": "Juegos y Juguetes",
    "tags": "destello brillo magia resplandor astro"
  },
  {
    "name": "PartyPopper",
    "label": "Lanza Confeti de Cumpleaños",
    "category": "Juegos y Juguetes",
    "tags": "fiesta cumpleanos sorpresa piñata serpentina confeti"
  },
  {
    "name": "Gift",
    "label": "Caja de Regalo de Navidad",
    "category": "Juegos y Juguetes",
    "tags": "obsequio navidad fiesta sorpresa lazo cinta"
  },
  {
    "name": "RollerCoaster",
    "label": "Montaña Rusa de Parque",
    "category": "Juegos y Juguetes",
    "tags": "parque atracciones montana rusa diversion feria"
  },
  {
    "name": "PiggyBank",
    "label": "Alcancía de Cerdito Ahorrador",
    "category": "Juegos y Juguetes",
    "tags": "alcancia cerdito chanchito ahorros monedas"
  },
  {
    "name": "Sticker",
    "label": "Pegatina / Sticker Coleccionable",
    "category": "Juegos y Juguetes",
    "tags": "calcomania sticker album coleccion despegar"
  },
  {
    "name": "Ticket",
    "label": "Boleto de Parque y Feria",
    "category": "Juegos y Juguetes",
    "tags": "parque feria cine entrada boleto pase"
  },
  {
    "name": "Origami",
    "label": "Papiroflexia / Barquito de Papel",
    "category": "Juegos y Juguetes",
    "tags": "papel barco grulla plegar cisne manualidad"
  },
  {
    "name": "Theater",
    "label": "Escenario y Telón de Títeres",
    "category": "Juegos y Juguetes",
    "tags": "titeres show actuacion cine escenario telon"
  },
  {
    "name": "Drama",
    "label": "Máscaras de Disfraces y Teatro",
    "category": "Juegos y Juguetes",
    "tags": "teatro drama actuacion disfraz mascara comedia"
  },
  {
    "name": "Coins",
    "label": "Monedas de Tesoro",
    "category": "Juegos y Juguetes",
    "tags": "dinero alcancia fichas pirata oro tesoro"
  },
  {
    "name": "Hourglass",
    "label": "Reloj de Arena para Turnos",
    "category": "Juegos y Juguetes",
    "tags": "tiempo turno cronometro juego arena minutos"
  },
  {
    "name": "CircleDot",
    "label": "Ficha Redonda de Juego",
    "category": "Juegos y Juguetes",
    "tags": "ficha punto damas ludo juego"
  },
  {
    "name": "CirclePlay",
    "label": "Botón de Comenzar a Jugar",
    "category": "Juegos y Juguetes",
    "tags": "play jugar accion reproducir boton"
  },
  {
    "name": "Play",
    "label": "Flecha de Inicio de Juego",
    "category": "Juegos y Juguetes",
    "tags": "comenzar play activar inicio"
  },
  {
    "name": "Shuffle",
    "label": "Barajar Naipes / Cartas",
    "category": "Juegos y Juguetes",
    "tags": "mezclar cartas azar naipes mazo baraja"
  },
  {
    "name": "Crosshair",
    "label": "Mira Láser de Puntería",
    "category": "Juegos y Juguetes",
    "tags": "punteria mira blanco precision laser mira"
  },
  {
    "name": "Car",
    "label": "Automóvil Clásico",
    "category": "Vehículos y Transporte",
    "tags": "carro auto coche carrera ruedas pista"
  },
  {
    "name": "CarFront",
    "label": "Auto Deportivo Frontal",
    "category": "Vehículos y Transporte",
    "tags": "coche vehiculo motor velocidad carreras"
  },
  {
    "name": "CarTaxiFront",
    "label": "Taxi Urbano Amarillo",
    "category": "Vehículos y Transporte",
    "tags": "taxi transporte ciudad servicio publico"
  },
  {
    "name": "Truck",
    "label": "Camión Monstruo / Carga",
    "category": "Vehículos y Transporte",
    "tags": "camion trailer transporte carga volqueta monster"
  },
  {
    "name": "Bus",
    "label": "Autobús Escolar Amarillo",
    "category": "Vehículos y Transporte",
    "tags": "bus colectivo escuela transporte escolar ninos"
  },
  {
    "name": "BusFront",
    "label": "Autobús de Dos Pisos",
    "category": "Vehículos y Transporte",
    "tags": "bus transporte turismo pasajeros urbano"
  },
  {
    "name": "Bike",
    "label": "Bicicleta de Paseo Infantil",
    "category": "Vehículos y Transporte",
    "tags": "bici pedal carreras parque ruedas manubrio"
  },
  {
    "name": "Plane",
    "label": "Avión de Pasajeros",
    "category": "Vehículos y Transporte",
    "tags": "vuelo avioneta aero aeropuerto alas viajar"
  },
  {
    "name": "PlaneTakeoff",
    "label": "Avión en Despegue",
    "category": "Vehículos y Transporte",
    "tags": "viaje despegue cielo altura volar"
  },
  {
    "name": "PlaneLanding",
    "label": "Avión en Aterrizaje",
    "category": "Vehículos y Transporte",
    "tags": "llegada pista viaje aterrizaje aeropuerto"
  },
  {
    "name": "Rocket",
    "label": "Cohete Espacial a la Luna",
    "category": "Vehículos y Transporte",
    "tags": "astronave galaxia luna despegar propulsor cohete"
  },
  {
    "name": "Ship",
    "label": "Barco Transatlántico",
    "category": "Vehículos y Transporte",
    "tags": "crucero vapor oceano barco buque barco"
  },
  {
    "name": "Sailboat",
    "label": "Velero en el Lago",
    "category": "Vehículos y Transporte",
    "tags": "bote regata vela agua viento lago velero"
  },
  {
    "name": "Anchor",
    "label": "Ancla Marina de Barco",
    "category": "Vehículos y Transporte",
    "tags": "marinero puerto barco mar ancla oceano"
  },
  {
    "name": "TrainFront",
    "label": "Locomotora de Tren Chuchú",
    "category": "Vehículos y Transporte",
    "tags": "tren vias estacion rieles chuchu maquinista"
  },
  {
    "name": "TrainTrack",
    "label": "Vías del Tren en Curva",
    "category": "Vehículos y Transporte",
    "tags": "rieles tren caminos trayecto circuito vias"
  },
  {
    "name": "TramFront",
    "label": "Tranvía Urbano",
    "category": "Vehículos y Transporte",
    "tags": "tren tranvia cable via ciudad electrico"
  },
  {
    "name": "CableCar",
    "label": "Teleférico de Nieve",
    "category": "Vehículos y Transporte",
    "tags": "nieve cabina teleferico cable montana cabina"
  },
  {
    "name": "Tractor",
    "label": "Tractor de Granja Verde",
    "category": "Vehículos y Transporte",
    "tags": "granja campo maquinaria cosechadora tractor"
  },
  {
    "name": "Navigation",
    "label": "Flecha Navegadora GPS",
    "category": "Vehículos y Transporte",
    "tags": "brujula direccion rumbo orientacion gps"
  },
  {
    "name": "Compass",
    "label": "Brújula Clásica de Bolsillo",
    "category": "Vehículos y Transporte",
    "tags": "orientacion explorador mapa norte brujula"
  },
  {
    "name": "Fuel",
    "label": "Surtidor de Gasolina / Pits",
    "category": "Vehículos y Transporte",
    "tags": "estacion combustible gasolina diesel pits carrera"
  },
  {
    "name": "Gauge",
    "label": "Velocímetro de Tablero",
    "category": "Vehículos y Transporte",
    "tags": "velocimetro tacometro medidor revoluciones aguja"
  },
  {
    "name": "Route",
    "label": "Circuito de Carreras con Curvas",
    "category": "Vehículos y Transporte",
    "tags": "camino circuito curvas asfalto pista carrera"
  },
  {
    "name": "MapPin",
    "label": "Marcador de Destino en el Mapa",
    "category": "Vehículos y Transporte",
    "tags": "ubicacion mapa gps chincheta pin parada"
  },
  {
    "name": "Map",
    "label": "Mapa del Tesoro Pirata",
    "category": "Vehículos y Transporte",
    "tags": "cartografia exploracion tesoro ruta mapa"
  },
  {
    "name": "Flag",
    "label": "Bandera a Cuadros de Meta",
    "category": "Vehículos y Transporte",
    "tags": "meta carreras cuadros bandera victoria llegada"
  },
  {
    "name": "LifeBuoy",
    "label": "Aro Salvavidas Acuático",
    "category": "Vehículos y Transporte",
    "tags": "piscina flotador rescate boya agua salvavidas"
  },
  {
    "name": "Milestone",
    "label": "Hito Kilométrico de Ruta",
    "category": "Vehículos y Transporte",
    "tags": "carretera senal distancia kilometro poste"
  },
  {
    "name": "Siren",
    "label": "Sirena Policial y de Bomberos",
    "category": "Vehículos y Transporte",
    "tags": "policia bomberos ambulancia emergencia sirena rescate"
  },
  {
    "name": "TrafficCone",
    "label": "Cono Vial de Seguridad",
    "category": "Vehículos y Transporte",
    "tags": "cono obras transito precaucion pista"
  },
  {
    "name": "Luggage",
    "label": "Maleta de Viaje con Ruedas",
    "category": "Vehículos y Transporte",
    "tags": "valija equipaje viaje vacaciones maletin"
  },
  {
    "name": "Swords",
    "label": "Espadas Cruzadas de Batalla",
    "category": "Fantasía y Héroes",
    "tags": "espada duelo combate guerrero batalla esgrima"
  },
  {
    "name": "Sword",
    "label": "Espada Legendaria de Caballero",
    "category": "Fantasía y Héroes",
    "tags": "caballero armas medieval acero hoja espada"
  },
  {
    "name": "Shield",
    "label": "Escudo de Protección Real",
    "category": "Fantasía y Héroes",
    "tags": "defensa proteccion armadura heroe escudo"
  },
  {
    "name": "ShieldCheck",
    "label": "Escudo Inmune Verificado",
    "category": "Fantasía y Héroes",
    "tags": "seguro verificado invencible proteccion check"
  },
  {
    "name": "ShieldAlert",
    "label": "Escudo de Misión de Rescate",
    "category": "Fantasía y Héroes",
    "tags": "peligro aventura alerta advertencia emergencia"
  },
  {
    "name": "Wand",
    "label": "Varita Mágica de Hechicero",
    "category": "Fantasía y Héroes",
    "tags": "magia hechicero hada truco varita truco magia"
  },
  {
    "name": "WandSparkles",
    "label": "Varita con Polvo de Estrellas",
    "category": "Fantasía y Héroes",
    "tags": "hechizo magia encantamiento estrellas varita"
  },
  {
    "name": "Ghost",
    "label": "Fantasmita Blanco Gracioso",
    "category": "Fantasía y Héroes",
    "tags": "halloween espanto castillo susto fantasma"
  },
  {
    "name": "Skull",
    "label": "Calavera Pirata de Bandera",
    "category": "Fantasía y Héroes",
    "tags": "piratas calavera huesos aventura corsario"
  },
  {
    "name": "Castle",
    "label": "Castillo Medieval con Torres",
    "category": "Fantasía y Héroes",
    "tags": "fortaleza palacio reyes caballeros muralla torre"
  },
  {
    "name": "Key",
    "label": "Llave Dorada del Secreto",
    "category": "Fantasía y Héroes",
    "tags": "llave cofre secreto misterio puerta candado"
  },
  {
    "name": "Lock",
    "label": "Candado Firme del Tesoro",
    "category": "Fantasía y Héroes",
    "tags": "cerradura secreto cofre tesoro seguro candado"
  },
  {
    "name": "Bomb",
    "label": "Bomba de Acción y Cómics",
    "category": "Fantasía y Héroes",
    "tags": "explosion comic heroe accion dinamita mecha"
  },
  {
    "name": "Flame",
    "label": "Llamarada de Dragón",
    "category": "Fantasía y Héroes",
    "tags": "llama dragon fuego poder llamarada fogata"
  },
  {
    "name": "FlameKindling",
    "label": "Fogata de Bosque de Noche",
    "category": "Fantasía y Héroes",
    "tags": "campamento bosque fuego lenas brasas"
  },
  {
    "name": "Zap",
    "label": "Rayo de Superpoder Eléctrico",
    "category": "Fantasía y Héroes",
    "tags": "energia superpoder rayo velocidad trueno voltios"
  },
  {
    "name": "ZapOff",
    "label": "Superpoder en Carga",
    "category": "Fantasía y Héroes",
    "tags": "sin energia trueno pausa descanso recarga"
  },
  {
    "name": "Axe",
    "label": "Hacha de Vikingo Explorador",
    "category": "Fantasía y Héroes",
    "tags": "vikingo hacha leñador madera aventura filo"
  },
  {
    "name": "Cross",
    "label": "Amuleto Talismán de Héroe",
    "category": "Fantasía y Héroes",
    "tags": "amuleto talisman mistico heroe magia"
  },
  {
    "name": "Vault",
    "label": "Bóveda Fuerte Acorazada",
    "category": "Fantasía y Héroes",
    "tags": "boveda caja fuerte tesoro secreto oro"
  },
  {
    "name": "Bot",
    "label": "Robot con Antena Amigable",
    "category": "Robótica y Ciencia",
    "tags": "androide robotica automata mecatronica robot"
  },
  {
    "name": "BotMessageSquare",
    "label": "Robot Inteligente que Habla",
    "category": "Robótica y Ciencia",
    "tags": "ia chat robot inteligencia artificial chat"
  },
  {
    "name": "Cpu",
    "label": "Microprocesador Cuántico",
    "category": "Robótica y Ciencia",
    "tags": "procesador tecnologia circuito silicio chip"
  },
  {
    "name": "Atom",
    "label": "Átomo y Moléculas de Laboratorio",
    "category": "Robótica y Ciencia",
    "tags": "ciencia quimica particula laboratorio proton atomo"
  },
  {
    "name": "Dna",
    "label": "Hélice de ADN Científico",
    "category": "Robótica y Ciencia",
    "tags": "genetica biologia celula vida herencia adn"
  },
  {
    "name": "Microscope",
    "label": "Microscopio de Gran Aumento",
    "category": "Robótica y Ciencia",
    "tags": "aumento laboratorio biologia bacterias lente"
  },
  {
    "name": "Telescope",
    "label": "Telescopio de Galaxias y Estrellas",
    "category": "Robótica y Ciencia",
    "tags": "astronomia espacio constelacion cosmos planeta"
  },
  {
    "name": "Satellite",
    "label": "Satélite en Órbita Terrestre",
    "category": "Robótica y Ciencia",
    "tags": "comunicacion espacio orbita tecnologia satelite"
  },
  {
    "name": "Orbit",
    "label": "Órbita Planetaria Solar",
    "category": "Robótica y Ciencia",
    "tags": "sistema solar gravedad planetas sol satelite orbita"
  },
  {
    "name": "CircuitBoard",
    "label": "Placa de Circuitos y Chips",
    "category": "Robótica y Ciencia",
    "tags": "electronica soldar chips pistas placa circuitos"
  },
  {
    "name": "Binary",
    "label": "Código Binario de Computadora",
    "category": "Robótica y Ciencia",
    "tags": "ceros unos programacion informatica codigo software"
  },
  {
    "name": "Cog",
    "label": "Engranaje de Máquina a Cuerda",
    "category": "Robótica y Ciencia",
    "tags": "mecanismo movimiento piezas giro tuerca cuerda"
  },
  {
    "name": "Settings",
    "label": "Ruedas Dentadas Conectadas",
    "category": "Robótica y Ciencia",
    "tags": "maquina ajuste mecanismo configuracion engranajes"
  },
  {
    "name": "Magnet",
    "label": "Imán Bicolor Rojo y Azul",
    "category": "Robótica y Ciencia",
    "tags": "magnetismo polos atraccion fisica metal iman"
  },
  {
    "name": "Lightbulb",
    "label": "Bombilla de Ideas Brillantes",
    "category": "Robótica y Ciencia",
    "tags": "luz invento foco ingenio ocurrencia bombillo"
  },
  {
    "name": "Battery",
    "label": "Batería Cargada de Juguete",
    "category": "Robótica y Ciencia",
    "tags": "pila energia juguete control remoto pila bateria"
  },
  {
    "name": "BatteryCharging",
    "label": "Batería en Carga Solar",
    "category": "Robótica y Ciencia",
    "tags": "carga verde energia solar bateria enchufe recarga"
  },
  {
    "name": "Globe",
    "label": "Globo Terráqueo de Países",
    "category": "Robótica y Ciencia",
    "tags": "geografia mapa continentes esfera mundo globo"
  },
  {
    "name": "Earth",
    "label": "Planeta Tierra con Mares",
    "category": "Robótica y Ciencia",
    "tags": "planeta mundo ecologia espacio hogar tierra"
  },
  {
    "name": "Moon",
    "label": "Luna con Cráteres Espaciales",
    "category": "Robótica y Ciencia",
    "tags": "noche cielo satelite espacial crateres luna"
  },
  {
    "name": "MoonStar",
    "label": "Luna Llena con Estrella Fiel",
    "category": "Robótica y Ciencia",
    "tags": "cielo nocturno dulces suenos estrellas constelacion"
  },
  {
    "name": "Sun",
    "label": "Sol Brillante de Día Soleado",
    "category": "Robótica y Ciencia",
    "tags": "calor amanecer luz verano estrella sol rayos"
  },
  {
    "name": "SunMedium",
    "label": "Sol Radiante del Mediodía",
    "category": "Robótica y Ciencia",
    "tags": "rayos solares dia soleado brillo luz mediodia"
  },
  {
    "name": "Sunset",
    "label": "Puesta de Sol en el Horizonte",
    "category": "Robótica y Ciencia",
    "tags": "atardecer horizonte crepusculo sol tarde"
  },
  {
    "name": "Cloud",
    "label": "Nube Esponjosa de Algodón",
    "category": "Robótica y Ciencia",
    "tags": "cielo algodon tiempo clima condensacion nube"
  },
  {
    "name": "CloudSun",
    "label": "Sol Asomando entre Nubes",
    "category": "Robótica y Ciencia",
    "tags": "buen tiempo clima templado cielo sol nube"
  },
  {
    "name": "CloudRain",
    "label": "Nube con Lluvia Suave",
    "category": "Robótica y Ciencia",
    "tags": "lluvia agua chaparron tormenta gotas precipitacion"
  },
  {
    "name": "CloudLightning",
    "label": "Tormenta con Rayo Luminoso",
    "category": "Robótica y Ciencia",
    "tags": "trueno tempestad relampago rayo tormenta"
  },
  {
    "name": "CloudSnow",
    "label": "Nube que Deja Caer Nieve",
    "category": "Robótica y Ciencia",
    "tags": "nieve invierno polo frio copos helada"
  },
  {
    "name": "Snowflake",
    "label": "Copo de Nieve Cristalino",
    "category": "Robótica y Ciencia",
    "tags": "hielo frio congelado copo cristal invierno"
  },
  {
    "name": "Rainbow",
    "label": "Arcoíris Multicolores",
    "category": "Robótica y Ciencia",
    "tags": "colores cielo magia lluvia sol siete arcoiris"
  },
  {
    "name": "Wind",
    "label": "Ráfaga de Viento Veloz",
    "category": "Robótica y Ciencia",
    "tags": "aire cometa brisa molino soplo ventarrón"
  },
  {
    "name": "Tornado",
    "label": "Torbellino Remolino de Viento",
    "category": "Robótica y Ciencia",
    "tags": "viento fenomeno fuerte giro huracan tornado"
  },
  {
    "name": "Droplet",
    "label": "Gota de Agua Cristalina",
    "category": "Robótica y Ciencia",
    "tags": "agua lluvia liquido burbuja gota rocio"
  },
  {
    "name": "Droplets",
    "label": "Salpicadura de Gotas Frescas",
    "category": "Robótica y Ciencia",
    "tags": "salpicadura lluvia rocio agua chapoteo"
  },
  {
    "name": "Radio",
    "label": "Radio Transmisor Walkie-Talkie",
    "category": "Robótica y Ciencia",
    "tags": "comunicador walkie frecuencia antena radio"
  },
  {
    "name": "RadioTower",
    "label": "Antena de Telecomunicaciones",
    "category": "Robótica y Ciencia",
    "tags": "senal ondas antena emision torre comunicacion"
  },
  {
    "name": "Radar",
    "label": "Pantalla de Radar Rastreador",
    "category": "Robótica y Ciencia",
    "tags": "radar rastreo ondas barrido localizador"
  },
  {
    "name": "Scan",
    "label": "Haz de Escaneo Láser",
    "category": "Robótica y Ciencia",
    "tags": "escaner sensor laser lectura optica"
  },
  {
    "name": "Thermometer",
    "label": "Termómetro de Temperatura",
    "category": "Robótica y Ciencia",
    "tags": "temperatura calor frio grados medir termometro"
  },
  {
    "name": "Dog",
    "label": "Perrito Cachorro Fiel",
    "category": "Animales y Naturaleza",
    "tags": "perro mascota peluche can canino cachorro ladrido"
  },
  {
    "name": "Cat",
    "label": "Gatito Juguetón de Lana",
    "category": "Animales y Naturaleza",
    "tags": "gato felino mascota peluche michi minino ronroneo"
  },
  {
    "name": "Bird",
    "label": "Pajarito Cantando en la Rama",
    "category": "Animales y Naturaleza",
    "tags": "ave plumas cantar nido vuelo trinar silbido"
  },
  {
    "name": "Fish",
    "label": "Pez Payaso Acuático",
    "category": "Animales y Naturaleza",
    "tags": "peces agua mar pecera aletas escamas natacion"
  },
  {
    "name": "FishSymbol",
    "label": "Silueta Marina de Pececito",
    "category": "Animales y Naturaleza",
    "tags": "marino pesca acuatico rio estanque pez"
  },
  {
    "name": "Rabbit",
    "label": "Conejito Blanco de Pascua",
    "category": "Animales y Naturaleza",
    "tags": "conejito pascua orejas saltar liebre zanahoria"
  },
  {
    "name": "Turtle",
    "label": "Tortuga Marina Tranquila",
    "category": "Animales y Naturaleza",
    "tags": "quelonio caparazon lento mar tierra carapacho"
  },
  {
    "name": "Snail",
    "label": "Caracol con Casa Espiral",
    "category": "Animales y Naturaleza",
    "tags": "molusco espiral jardin babosa concha lento"
  },
  {
    "name": "Squirrel",
    "label": "Ardilla con Cola Esponjosa",
    "category": "Animales y Naturaleza",
    "tags": "bosque nuez cola roedor roble ardilla saltos"
  },
  {
    "name": "Bug",
    "label": "Mariquita de Siete Puntos",
    "category": "Animales y Naturaleza",
    "tags": "mariquita insecto bicho puntos jardin cochinilla"
  },
  {
    "name": "Egg",
    "label": "Huevo de Dinosaurio Bebé",
    "category": "Animales y Naturaleza",
    "tags": "dinosaurio cascaron nido sorpresa ave nacimiento"
  },
  {
    "name": "Feather",
    "label": "Pluma Liviana de Colores",
    "category": "Animales y Naturaleza",
    "tags": "suave pluma indio dibujo ala liviana plumaje"
  },
  {
    "name": "PawPrint",
    "label": "Huellita de Gatito o Cachorro",
    "category": "Animales y Naturaleza",
    "tags": "huella animal perro gato pata rastro pisada"
  },
  {
    "name": "Bone",
    "label": "Huesito de Juguete para Perro",
    "category": "Animales y Naturaleza",
    "tags": "perro juguete comida premio morder calcio"
  },
  {
    "name": "Rat",
    "label": "Ratoncito Rápido",
    "category": "Animales y Naturaleza",
    "tags": "roedor queso raton cola orejitas madriguera"
  },
  {
    "name": "Trees",
    "label": "Bosque Lleno de Árboles",
    "category": "Animales y Naturaleza",
    "tags": "naturaleza selva plantas aire arboleda bosque"
  },
  {
    "name": "TreePine",
    "label": "Pino Navideño Aromático",
    "category": "Animales y Naturaleza",
    "tags": "bosque arbol de navidad conifera pinar abeto"
  },
  {
    "name": "TreeDeciduous",
    "label": "Árbol Verde Frondoso",
    "category": "Animales y Naturaleza",
    "tags": "arbol parque hoja sombra roble sauce jardin"
  },
  {
    "name": "Flower",
    "label": "Margarita de Pétalos Blancos",
    "category": "Animales y Naturaleza",
    "tags": "flor petalos primavera jardin polen aroma"
  },
  {
    "name": "Flower2",
    "label": "Flor Silvestre Colorida",
    "category": "Animales y Naturaleza",
    "tags": "botanica flores polen aroma petalo campo"
  },
  {
    "name": "Sprout",
    "label": "Semilla Germinando con Brote",
    "category": "Animales y Naturaleza",
    "tags": "brote ecologia crecer huerto semilla plantita"
  },
  {
    "name": "Leaf",
    "label": "Hoja Botánica Otoñal",
    "category": "Animales y Naturaleza",
    "tags": "hoja verde otono naturaleza fotosintesis arbol"
  },
  {
    "name": "Clover",
    "label": "Trébol Mágico de Cuatro Hojas",
    "category": "Animales y Naturaleza",
    "tags": "suerte fortuna verde magico trebol duende"
  },
  {
    "name": "Wheat",
    "label": "Espiga de Trigo Dorado",
    "category": "Animales y Naturaleza",
    "tags": "cosecha cereal campo granja trigo espigas"
  },
  {
    "name": "Palette",
    "label": "Paleta con Mezcla de Óleos",
    "category": "Arte y Creatividad",
    "tags": "acuarelas colores pintar pincel oleo paleta lienzo"
  },
  {
    "name": "Paintbrush",
    "label": "Pincel Fino para Cuadros",
    "category": "Arte y Creatividad",
    "tags": "trazos pintura lienzo arte cerdas pincelada"
  },
  {
    "name": "PaintbrushVertical",
    "label": "Brocha de Pintar Paredes",
    "category": "Arte y Creatividad",
    "tags": "pintura brocha mural decoracion rodillo trazo"
  },
  {
    "name": "PaintBucket",
    "label": "Bote de Pintura Derramada",
    "category": "Arte y Creatividad",
    "tags": "balde color derramar fondo pintar bote lata"
  },
  {
    "name": "Scissors",
    "label": "Tijeras Seguras de Punta Redonda",
    "category": "Arte y Creatividad",
    "tags": "cortar papel tela recortar collage tijera figuras"
  },
  {
    "name": "Pen",
    "label": "Pluma con Tinta Caligráfica",
    "category": "Arte y Creatividad",
    "tags": "tinta escribir firmar letras caligrafia pluma estilogrfica"
  },
  {
    "name": "PenTool",
    "label": "Pluma Vectorial de Diseñador",
    "category": "Arte y Creatividad",
    "tags": "curvas diseno digital vectores trazado nodo pluma"
  },
  {
    "name": "Pencil",
    "label": "Lápiz Escolar con Borrador",
    "category": "Arte y Creatividad",
    "tags": "escribir boceto dibujo borrador carboncillo lapiz"
  },
  {
    "name": "PencilRuler",
    "label": "Lápiz y Regla de Escuadra",
    "category": "Arte y Creatividad",
    "tags": "geometria dibujo tecnico medidas trazos escuadra regla"
  },
  {
    "name": "Eraser",
    "label": "Goma Blanca para Borrar",
    "category": "Arte y Creatividad",
    "tags": "borrar corregir goma dibujo limpia borrador"
  },
  {
    "name": "Stamp",
    "label": "Sello con Tinta de Estrellas",
    "category": "Arte y Creatividad",
    "tags": "tinta estampilla timbre certificado marca sello estampa"
  },
  {
    "name": "Highlighter",
    "label": "Resaltador de Colores Neón",
    "category": "Arte y Creatividad",
    "tags": "fluor fluorescente subrayar texto colores marcador neon"
  },
  {
    "name": "Image",
    "label": "Pintura Enmarcada en Lienzo",
    "category": "Arte y Creatividad",
    "tags": "paisaje marco foto ilustracion cuadro obra arte"
  },
  {
    "name": "Camera",
    "label": "Cámara de Fotos Instantáneas",
    "category": "Arte y Creatividad",
    "tags": "fotos instantanea recuerdo lente flash retrato"
  },
  {
    "name": "Video",
    "label": "Videocámara para Cortometrajes",
    "category": "Arte y Creatividad",
    "tags": "grabar pelicula cine tomas video filmar"
  },
  {
    "name": "Film",
    "label": "Tira de Película Cinematográfica",
    "category": "Arte y Creatividad",
    "tags": "celuloide cine fotograma pelicula rollo fotograma"
  },
  {
    "name": "Clapperboard",
    "label": "Claqueta de Rodaje de Cine",
    "category": "Arte y Creatividad",
    "tags": "accion rodaje pelicula cine escena director claqueta"
  },
  {
    "name": "Crop",
    "label": "Encuadre de Recorte de Dibujo",
    "category": "Arte y Creatividad",
    "tags": "recortar encuadre composicion fotografia arte"
  },
  {
    "name": "Brush",
    "label": "Pincel Suave de Acuarela",
    "category": "Arte y Creatividad",
    "tags": "cerdas pincel acuarela pintar trazo"
  },
  {
    "name": "Music",
    "label": "Nota Musical Solitaria",
    "category": "Música y Sonido",
    "tags": "solfeo melodia ritmo cancion nota corchea tono"
  },
  {
    "name": "Music2",
    "label": "Doble Corchea de Ritmo Alegre",
    "category": "Música y Sonido",
    "tags": "musica baile fiesta melodia compas notas"
  },
  {
    "name": "Music3",
    "label": "Tres Notas Flotantes",
    "category": "Música y Sonido",
    "tags": "armonia compas ritmo sonido partitura cancion"
  },
  {
    "name": "Music4",
    "label": "Notas Dulces de Canción de Cuna",
    "category": "Música y Sonido",
    "tags": "musica cuna relajacion sonido canciones melodia"
  },
  {
    "name": "Guitar",
    "label": "Guitarra Acústica de Cuerdas",
    "category": "Música y Sonido",
    "tags": "cuerdas instrumento concierto rock ritmo guitarra"
  },
  {
    "name": "Piano",
    "label": "Teclas de Piano de Concierto",
    "category": "Música y Sonido",
    "tags": "teclas sinfonia partitura melodias acordes piano"
  },
  {
    "name": "Headphones",
    "label": "Auriculares Acolchados de DJ",
    "category": "Música y Sonido",
    "tags": "audifonos escuchar dj sonido estereo cascos musica"
  },
  {
    "name": "Mic",
    "label": "Micrófono de Cantante de Escenario",
    "category": "Música y Sonido",
    "tags": "cantar voz grabacion karaoke micro recital"
  },
  {
    "name": "Speaker",
    "label": "Caja Acústica con Gran Sonido",
    "category": "Música y Sonido",
    "tags": "bocina volumen sonido bajo estereo parlante altavoz"
  },
  {
    "name": "Volume2",
    "label": "Volumen con Ondas Sonoras",
    "category": "Música y Sonido",
    "tags": "altavoz fuerte sonido audio parlante volumen"
  },
  {
    "name": "Bell",
    "label": "Campanilla Dorada de Melodías",
    "category": "Música y Sonido",
    "tags": "timbre sonido tintineo campana aviso campanilla"
  },
  {
    "name": "BellRing",
    "label": "Campana Repicando en Concierto",
    "category": "Música y Sonido",
    "tags": "sonajero aviso sonido alarma alerta repique"
  },
  {
    "name": "CassetteTape",
    "label": "Casete de Éxitos Infantiles",
    "category": "Música y Sonido",
    "tags": "cinta retro mixtape canciones walkman casete"
  },
  {
    "name": "Disc",
    "label": "Disco de Vinilo de Música",
    "category": "Música y Sonido",
    "tags": "vinilo musica tocadiscos dj pista acetato"
  },
  {
    "name": "Volume",
    "label": "Icono de Audio Suave",
    "category": "Música y Sonido",
    "tags": "sonido voz audio nivel"
  },
  {
    "name": "Volume1",
    "label": "Volumen Moderado Agradable",
    "category": "Música y Sonido",
    "tags": "volumen medio tono musica sonido"
  },
  {
    "name": "Baby",
    "label": "Rostro de Bebé Risueño",
    "category": "Bebés y Primera Infancia",
    "tags": "bebe recien nacido sonajero cuna chupete nino carita"
  },
  {
    "name": "Milk",
    "label": "Biberón con Medidas y Leche",
    "category": "Bebés y Primera Infancia",
    "tags": "tetero leche alimentacion bebe mamadera biberon"
  },
  {
    "name": "Heart",
    "label": "Corazón Rojo de Mucho Cariño",
    "category": "Bebés y Primera Infancia",
    "tags": "amor carino apego ternura rojo corazon abrazo"
  },
  {
    "name": "HeartHandshake",
    "label": "Apretón de Manos Afectuoso",
    "category": "Bebés y Primera Infancia",
    "tags": "amistad abrazo compartir familia union pacto"
  },
  {
    "name": "HandHeart",
    "label": "Manitas Cálidas con Corazón",
    "category": "Bebés y Primera Infancia",
    "tags": "cuidado carino ternura proteccion palma manos"
  },
  {
    "name": "Smile",
    "label": "Sonrisa Iluminada de Oreja a Oreja",
    "category": "Bebés y Primera Infancia",
    "tags": "alegria sonrisa diversion feliz contento risueño"
  },
  {
    "name": "Laugh",
    "label": "Carcajadas y Cosquillas",
    "category": "Bebés y Primera Infancia",
    "tags": "risa chiste juego travesura diversion carcajada"
  },
  {
    "name": "SmilePlus",
    "label": "Carita Feliz con Destello",
    "category": "Bebés y Primera Infancia",
    "tags": "felicidad positiva bienestar animo optimismo"
  },
  {
    "name": "Bed",
    "label": "Cama Suave con Almohadas",
    "category": "Bebés y Primera Infancia",
    "tags": "dormir siesta descanso sabanas cuna colchoncito"
  },
  {
    "name": "BedDouble",
    "label": "Cama Grande de Abrazos",
    "category": "Bebés y Primera Infancia",
    "tags": "dormitorio pijama descanso colchon cama sueno"
  },
  {
    "name": "Bath",
    "label": "Bañera con Jabón y Patitos",
    "category": "Bebés y Primera Infancia",
    "tags": "bano patito de hule jabon agua espuma tina"
  },
  {
    "name": "Shirt",
    "label": "Ropita de Bebé Cómoda",
    "category": "Bebés y Primera Infancia",
    "tags": "ropa prenda vestir algodon bebe body remera"
  },
  {
    "name": "Footprints",
    "label": "Pasos de Primeras Aventuras",
    "category": "Bebés y Primera Infancia",
    "tags": "caminar huellas gateo aprendizaje pisadas primeros pasos"
  },
  {
    "name": "SunDim",
    "label": "Sol Cálido del Amanecer",
    "category": "Bebés y Primera Infancia",
    "tags": "luz tenue descanso manana suave tibia"
  },
  {
    "name": "Goal",
    "label": "Arco de Fútbol con Red",
    "category": "Deportes y Aire Libre",
    "tags": "porteria pelota futbol gol partido red estadio"
  },
  {
    "name": "Dumbbell",
    "label": "Pesas de Entrenamiento Infantil",
    "category": "Deportes y Aire Libre",
    "tags": "fuerza ejercicio atletismo entrenamiento gym pesas"
  },
  {
    "name": "Timer",
    "label": "Cronómetro Digital de Carreras",
    "category": "Deportes y Aire Libre",
    "tags": "carreras tiempo segundos record atletismo cronometro"
  },
  {
    "name": "Watch",
    "label": "Reloj de Pulsera Inteligente",
    "category": "Deportes y Aire Libre",
    "tags": "hora tiempo puntual deporte podometro smartwatch"
  },
  {
    "name": "Tent",
    "label": "Carpa Canadiense de Camping",
    "category": "Deportes y Aire Libre",
    "tags": "camping acampar bosque naturaleza fogata carpa refugio"
  },
  {
    "name": "Mountain",
    "label": "Montaña Alta para Excursionistas",
    "category": "Deportes y Aire Libre",
    "tags": "senderismo escalar cerro aventura pico montana cumbre"
  },
  {
    "name": "MountainSnow",
    "label": "Cumbre Nevada para Esquiar",
    "category": "Deportes y Aire Libre",
    "tags": "esqui nieve invierno cumbre alpino hielo trineo"
  },
  {
    "name": "Binoculars",
    "label": "Binoculares de Observación",
    "category": "Deportes y Aire Libre",
    "tags": "observar aves safari exploracion campo lentes prismas"
  },
  {
    "name": "Waves",
    "label": "Olas del Mar para Nadar",
    "category": "Deportes y Aire Libre",
    "tags": "surf playa natacion mar piscina agua olas chapuzon"
  },
  {
    "name": "FlagTriangleRight",
    "label": "Banderín de Puesto de Meta",
    "category": "Deportes y Aire Libre",
    "tags": "marca meta puesto bandera circuito punto llegada"
  },
  {
    "name": "Activity",
    "label": "Pulso de Energía Deportiva",
    "category": "Deportes y Aire Libre",
    "tags": "ritmo cardiaco vitalidad energia ejercicio salud"
  },
  {
    "name": "Candy",
    "label": "Caramelo de Frutas Envuelto",
    "category": "Comida y Fiestas",
    "tags": "dulce golosina azucar piñata fiesta caramelo confite"
  },
  {
    "name": "Cookie",
    "label": "Galleta con Gotas de Cacao",
    "category": "Comida y Fiestas",
    "tags": "galletita merienda horno dulce chip chocolate galleta"
  },
  {
    "name": "Cake",
    "label": "Pastel de Cumpleaños con Velitas",
    "category": "Comida y Fiestas",
    "tags": "torta cumpleanos velas deseo fiesta pastel tarta"
  },
  {
    "name": "CakeSlice",
    "label": "Porción de Tarta de Fresa",
    "category": "Comida y Fiestas",
    "tags": "pastel postre dulce rebanada porcion tajada"
  },
  {
    "name": "IceCreamBowl",
    "label": "Copa de Helado con Nieve",
    "category": "Comida y Fiestas",
    "tags": "heladeria sundae postre frio nieve copa helado"
  },
  {
    "name": "IceCreamCone",
    "label": "Cono Crujiente de Helado",
    "category": "Comida y Fiestas",
    "tags": "barquilla cucurucho helado sabor vainilla cono fresa"
  },
  {
    "name": "Apple",
    "label": "Manzana Roja Jugosa",
    "category": "Comida y Fiestas",
    "tags": "fruta lonchera merienda manzana roja salud"
  },
  {
    "name": "Banana",
    "label": "Plátano Maduro y Dulce",
    "category": "Comida y Fiestas",
    "tags": "platano fruta potasio selva mono banana"
  },
  {
    "name": "Cherry",
    "label": "Par de Cerezas Rojas",
    "category": "Comida y Fiestas",
    "tags": "guindas fruta roja postre guinda cerezas"
  },
  {
    "name": "Citrus",
    "label": "Rodaja Cítrica Refrescante",
    "category": "Comida y Fiestas",
    "tags": "limon naranja vitamina jugo citrico pomelo"
  },
  {
    "name": "Grape",
    "label": "Racimo de Uvas de la Huerta",
    "category": "Comida y Fiestas",
    "tags": "uvas fruta vinedo parra fruta morada racimo"
  },
  {
    "name": "Carrot",
    "label": "Zanahoria Crujiente Naranja",
    "category": "Comida y Fiestas",
    "tags": "verdura huerta conejo vegetal naranja vitamina"
  },
  {
    "name": "Pizza",
    "label": "Rebanada Caliente de Pizza",
    "category": "Comida y Fiestas",
    "tags": "pizza comida rapida merienda queso mozzarella"
  },
  {
    "name": "Sandwich",
    "label": "Sándwich Tostado de Jamón",
    "category": "Comida y Fiestas",
    "tags": "pan emparedado picnic lonchera jamon queso"
  },
  {
    "name": "Croissant",
    "label": "Croissant Dorado de Mantequilla",
    "category": "Comida y Fiestas",
    "tags": "panaderia masa desayuno dulce hojaldre medialuna"
  },
  {
    "name": "Popcorn",
    "label": "Balde de Palomitas de Cine",
    "category": "Comida y Fiestas",
    "tags": "pochoclo pochoclos maiz cine snack pipocas palomitas"
  },
  {
    "name": "CupSoda",
    "label": "Vaso de Refresco con Sorbeto",
    "category": "Comida y Fiestas",
    "tags": "gaseosa refresco bebida pitillo fiesta soda sorbete"
  },
  {
    "name": "GlassWater",
    "label": "Vaso de Agua Fresca del Grifo",
    "category": "Comida y Fiestas",
    "tags": "bebida agua fresca hidratacion vaso sed"
  },
  {
    "name": "Coffee",
    "label": "Taza de Cacao Caliente",
    "category": "Comida y Fiestas",
    "tags": "cacao caliente desayuno taza invierno cafe chocolate"
  },
  {
    "name": "Utensils",
    "label": "Juego de Tenedor y Cuchara",
    "category": "Comida y Fiestas",
    "tags": "cocinita vajilla comer cubiertos cuchara tenedor"
  },
  {
    "name": "UtensilsCrossed",
    "label": "Cubiertos Cruzados de Banquete",
    "category": "Comida y Fiestas",
    "tags": "restaurante plato servido almuerzo comer cena"
  },
  {
    "name": "ChefHat",
    "label": "Gorro Blanco de Mini-Chef",
    "category": "Comida y Fiestas",
    "tags": "cocina cocinero reposteriachef chef gorro receta"
  },
  {
    "name": "Hammer",
    "label": "Martillo de Carpintería",
    "category": "Herramientas y Taller",
    "tags": "clavos taller carpinteria reparar golpe martillo clavar"
  },
  {
    "name": "Wrench",
    "label": "Llave Inglesa Plateada",
    "category": "Herramientas y Taller",
    "tags": "ajuste tuercas mecanico taller tornillo llave apretar"
  },
  {
    "name": "Drill",
    "label": "Taladro Perforador de Plástico",
    "category": "Herramientas y Taller",
    "tags": "taladrar perforar broca taller taladro orificio"
  },
  {
    "name": "Ruler",
    "label": "Regla de Medidas Exactas",
    "category": "Herramientas y Taller",
    "tags": "medicion centimetros trazar dibujo escala milimetros"
  },
  {
    "name": "Construction",
    "label": "Barrera con Cono de Obras",
    "category": "Herramientas y Taller",
    "tags": "obras construccion precaucion cono vial peligro desvio"
  },
  {
    "name": "Pickaxe",
    "label": "Pico de Explorador de Rocas",
    "category": "Herramientas y Taller",
    "tags": "mineria picar rocas cueva aventura pico minas"
  },
  {
    "name": "Shovel",
    "label": "Pala para Castillos de Arena",
    "category": "Herramientas y Taller",
    "tags": "cavar castillo de arena pala balde playa tierra jardin"
  },
  {
    "name": "HardHat",
    "label": "Casco Protector de Ingeniero",
    "category": "Herramientas y Taller",
    "tags": "seguridad casco constructor ingeniero obra proteccion"
  },
  {
    "name": "Nut",
    "label": "Tuerca Hexagonal Roscada",
    "category": "Herramientas y Taller",
    "tags": "mecanica tuerca tornillo ensamble metal rosca"
  },
  {
    "name": "House",
    "label": "Casita con Techo y Chimenea",
    "category": "Hogar y Casitas",
    "tags": "vivienda villa casita maqueta hogar fachada"
  },
  {
    "name": "DoorClosed",
    "label": "Puerta de Casita Cerrada",
    "category": "Hogar y Casitas",
    "tags": "habitacion entrada umbral puerta madera picaporte"
  },
  {
    "name": "DoorOpen",
    "label": "Puerta Abierta de Juguetería",
    "category": "Hogar y Casitas",
    "tags": "bienvenida entrar cuarto paso puerta abierta"
  },
  {
    "name": "Armchair",
    "label": "Sillón Mullido de Sala",
    "category": "Hogar y Casitas",
    "tags": "muebles sala butaca descanso sillon tapizado"
  },
  {
    "name": "Lamp",
    "label": "Lámpara con Tulipa de Noche",
    "category": "Hogar y Casitas",
    "tags": "iluminacion luz noche velador pantalla bombillo mesa"
  },
  {
    "name": "LampDesk",
    "label": "Lámpara de Estudio de Colores",
    "category": "Hogar y Casitas",
    "tags": "escritorio tareas lectura luz flexo foco mesa"
  },
  {
    "name": "Tv",
    "label": "Televisor con Series Favoritas",
    "category": "Hogar y Casitas",
    "tags": "pantalla caricaturas series tv tele dibujos"
  },
  {
    "name": "Clock",
    "label": "Reloj de Pared con Agujas",
    "category": "Hogar y Casitas",
    "tags": "minutos tiempo pendulo hora reloj pared tic tac"
  },
  {
    "name": "AlarmClock",
    "label": "Despertador de Doble Campana",
    "category": "Hogar y Casitas",
    "tags": "manana despertador sonido escuela campana reloj"
  },
  {
    "name": "Calendar",
    "label": "Calendario con Hojas de Días",
    "category": "Hogar y Casitas",
    "tags": "fechas meses dias eventos fiesta agenda efemerides"
  },
  {
    "name": "CalendarDays",
    "label": "Hoja de Planificación Semanal",
    "category": "Hogar y Casitas",
    "tags": "semana organizador fechas eventos"
  },
  {
    "name": "ShowerHead",
    "label": "Regadera de Ducha con Gotas",
    "category": "Hogar y Casitas",
    "tags": "ducha bano agua aseo regadera"
  },
  {
    "name": "Fan",
    "label": "Ventilador con Aspas Frescas",
    "category": "Hogar y Casitas",
    "tags": "aire fresco ventilador brisa aspas"
  },
  {
    "name": "Book",
    "label": "Libro de Cuentos de Hadas",
    "category": "Lectura y Aprendizaje",
    "tags": "cuentos fabulas lectura aprender paginas libro tapa dura"
  },
  {
    "name": "BookOpen",
    "label": "Libro Abierto para Leer Juntos",
    "category": "Lectura y Aprendizaje",
    "tags": "lectura ilustrado estudiar fabula historia paginas abiertas"
  },
  {
    "name": "BookMarked",
    "label": "Libro con Cinta Señaladora",
    "category": "Lectura y Aprendizaje",
    "tags": "novela cuentos lectura capitulo marcador cinta"
  },
  {
    "name": "Bookmark",
    "label": "Cinta para Marcar Capítulos",
    "category": "Lectura y Aprendizaje",
    "tags": "separador pagina recuerdo libro cinta marcador"
  },
  {
    "name": "GraduationCap",
    "label": "Birrete con Borla de Graduado",
    "category": "Lectura y Aprendizaje",
    "tags": "estudiante logro grado diploma escuela birrete saber"
  },
  {
    "name": "Backpack",
    "label": "Mochila con Correas Fuertes",
    "category": "Lectura y Aprendizaje",
    "tags": "colegio cuadernos viaje equipaje mochila bulto"
  },
  {
    "name": "Calculator",
    "label": "Calculadora con Botones Grandes",
    "category": "Lectura y Aprendizaje",
    "tags": "sumas matematicas cuentas numeros teclado restar"
  },
  {
    "name": "Paperclip",
    "label": "Clip Sujetapapeles de Alambre",
    "category": "Lectura y Aprendizaje",
    "tags": "papeleria unir hojas sujetapapeles alambre clip"
  },
  {
    "name": "FileText",
    "label": "Ficha con Tareas y Dibujos",
    "category": "Lectura y Aprendizaje",
    "tags": "dibujo hoja papel examen redaccion apunte hoja"
  },
  {
    "name": "Folder",
    "label": "Carpeta de Cartulina Fuerte",
    "category": "Lectura y Aprendizaje",
    "tags": "archivo tareas proyectos organizador folder clasificador"
  },
  {
    "name": "FolderOpen",
    "label": "Carpeta Abierta con Proyectos",
    "category": "Lectura y Aprendizaje",
    "tags": "hojas dibujos archivo abrir carpetas expedientes"
  },
  {
    "name": "Library",
    "label": "Estantería de Gran Biblioteca",
    "category": "Lectura y Aprendizaje",
    "tags": "libros estanteria sabiduria lectura estante tomos"
  },
  {
    "name": "Notebook",
    "label": "Libreta con Espiral Metálico",
    "category": "Lectura y Aprendizaje",
    "tags": "apuntes notas libreta dibujar espiral cuadricula"
  },
  {
    "name": "DraftingCompass",
    "label": "Compás Escolar Graduable",
    "category": "Lectura y Aprendizaje",
    "tags": "dibujo circulo geometria trazo compas matematicas"
  },
  {
    "name": "Newspaper",
    "label": "Gaceta Infantil de Noticias",
    "category": "Lectura y Aprendizaje",
    "tags": "periodico revista noticias historietas prensa"
  },
  {
    "name": "ThumbsUp",
    "label": "Pulgar Arriba de Excelente",
    "category": "Símbolos y Emociones",
    "tags": "aprobado genial bien like positivo pulgar exito"
  },
  {
    "name": "ThumbsDown",
    "label": "Pulgar Abajo",
    "category": "Símbolos y Emociones",
    "tags": "no dislike negativo no me gusta desaprobado"
  },
  {
    "name": "HeartCrack",
    "label": "Corazón Remendado con Amor",
    "category": "Símbolos y Emociones",
    "tags": "tristeza reparacion consuelo duelo corazon roto"
  },
  {
    "name": "HeartPulse",
    "label": "Latido Fuerte de Sorpresa",
    "category": "Símbolos y Emociones",
    "tags": "pulso vida emocion energia amor latir electrocardiograma"
  },
  {
    "name": "Hand",
    "label": "Mano en Alto Saludando",
    "category": "Símbolos y Emociones",
    "tags": "saludo choca los cinco parar ola mano palma"
  },
  {
    "name": "HandMetal",
    "label": "Mano con Señal Rockera",
    "category": "Símbolos y Emociones",
    "tags": "rock fiesta musica energia guitarras cuernos entusiasmo"
  },
  {
    "name": "Eye",
    "label": "Ojo Atento de Detective",
    "category": "Símbolos y Emociones",
    "tags": "mirar vision espiar detective lupa vista mirar"
  },
  {
    "name": "Glasses",
    "label": "Lentes Redondos Curiosos",
    "category": "Símbolos y Emociones",
    "tags": "gafas anteojos leer sabio detective lentes armazon"
  },
  {
    "name": "BadgeCheck",
    "label": "Insignia de Autenticidad",
    "category": "Símbolos y Emociones",
    "tags": "certificado coleccionista oficial autentico medalla sello"
  },
  {
    "name": "CircleCheck",
    "label": "Círculo con Marca de Aprobado",
    "category": "Símbolos y Emociones",
    "tags": "completado acierto correcto listo bien acierto"
  },
  {
    "name": "StarHalf",
    "label": "Estrella con Brillo a Medias",
    "category": "Símbolos y Emociones",
    "tags": "calificacion puntuacion resena estrella media ranking"
  },
  {
    "name": "ShoppingBag",
    "label": "Bolsa Llena de Regalos",
    "category": "Símbolos y Emociones",
    "tags": "tienda compras regalo empaque bolsa paquetera"
  },
  {
    "name": "ShoppingCart",
    "label": "Carrito Rodante de Juguetes",
    "category": "Símbolos y Emociones",
    "tags": "supermercado compras canasta carrito ruedas paseo"
  },
  {
    "name": "Tag",
    "label": "Etiqueta con Cordel de Oferta",
    "category": "Símbolos y Emociones",
    "tags": "oferta rebaja descuento etiqueta precio coleccion"
  },
  {
    "name": "Tags",
    "label": "Conjunto de Etiquetas Variadas",
    "category": "Símbolos y Emociones",
    "tags": "coleccion categorias marcas etiquetas clasificacion"
  },
  {
    "name": "Wallet",
    "label": "Billetera con Bolsillo de Monedas",
    "category": "Símbolos y Emociones",
    "tags": "ahorros alcancia billetes billetera dinero cartera"
  },
  {
    "name": "CircleDollarSign",
    "label": "Moneda Dorada con Signo de Peso",
    "category": "Símbolos y Emociones",
    "tags": "premio bono moneda dinero oro dolar efectivo"
  },
  {
    "name": "QrCode",
    "label": "Código QR de Experiencia 3D",
    "category": "Símbolos y Emociones",
    "tags": "escanear secreto digital interactivo qr matriz"
  },
  {
    "name": "ScanFace",
    "label": "Escaneo de Rostro Sonriente",
    "category": "Símbolos y Emociones",
    "tags": "reconocimiento facial rostro camara selfie"
  },
  {
    "name": "Fingerprint",
    "label": "Huella Secreta de Agente",
    "category": "Símbolos y Emociones",
    "tags": "espia misterio detective huella dactilar clave"
  },
  {
    "name": "Wifi",
    "label": "Conexión Inalámbrica Rápida",
    "category": "Símbolos y Emociones",
    "tags": "smart toy radiocontrol internet senal redes antena"
  },
  {
    "name": "Share2",
    "label": "Nodos Conectados para Compartir",
    "category": "Símbolos y Emociones",
    "tags": "amigos red jugar juntos multijugador nodos compartir"
  },
  {
    "name": "Send",
    "label": "Avión de Mensajes Mágicos",
    "category": "Símbolos y Emociones",
    "tags": "mensaje carta enviar sorpresa avion correo"
  },
  {
    "name": "MessageCircle",
    "label": "Globo de Diálogo de Historieta",
    "category": "Símbolos y Emociones",
    "tags": "historieta hablar globos comic cuento texto dialogo"
  },
  {
    "name": "MessageSquare",
    "label": "Bocadillo Cuadrado de Chat",
    "category": "Símbolos y Emociones",
    "tags": "dialogo chat conversacion mensaje cuadrado texto"
  },
  {
    "name": "CircleAlert",
    "label": "Señal de Precaución por Edad",
    "category": "Símbolos y Emociones",
    "tags": "seguridad precaucion atencion cuidado piezas ninos pequenos"
  },
  {
    "name": "RotateCcw",
    "label": "Giro en Sentido Inverso",
    "category": "Símbolos y Emociones",
    "tags": "reintentar volver girar reversa retroceso deshacer"
  },
  {
    "name": "Infinity",
    "label": "Símbolo de Diversión Infinita",
    "category": "Símbolos y Emociones",
    "tags": "diversion sin limites eterno infinito lazo ochos"
  },
  {
    "name": "Umbrella",
    "label": "Paraguas de Colores para la Lluvia",
    "category": "Símbolos y Emociones",
    "tags": "paraguas lluvia chaparron colores sombrilla"
  },
  {
    "name": "SlidersHorizontal",
    "label": "Filtros Horizontales",
    "category": "Símbolos y Emociones",
    "tags": "opciones filtros controles ajuste"
  },
  {
    "name": "Pin",
    "label": "Chincheta para Cartelera",
    "category": "Símbolos y Emociones",
    "tags": "chincheta pin fijar corcho cartelera"
  },
  {
    "name": "Check",
    "label": "Marca de Verificación Simple",
    "category": "Símbolos y Emociones",
    "tags": "check correcto hecho listo tilde"
  },
  {
    "name": "CheckCheck",
    "label": "Doble Check de Recibido",
    "category": "Símbolos y Emociones",
    "tags": "doble visto mensaje entregado"
  },
  {
    "name": "Circle",
    "label": "Círculo Simple",
    "category": "Símbolos y Emociones",
    "tags": "forma redonda circulo anillo aro"
  },
  {
    "name": "Star",
    "label": "Estrella Dorada Cinco Puntas",
    "category": "Símbolos y Emociones",
    "tags": "estrella brillo premio cielo noche"
  },
  {
    "name": "BookmarkPlus",
    "label": "Agregar a Favoritos",
    "category": "Símbolos y Emociones",
    "tags": "favorito guardar marcar libro lista"
  },
  {
    "name": "ScanBarcode",
    "label": "Lector de Código de Barras",
    "category": "Símbolos y Emociones",
    "tags": "barras escaner precio producto"
  },
  {
    "name": "Search",
    "label": "Lupa de Investigación",
    "category": "Símbolos y Emociones",
    "tags": "buscar lupa detective investigar rastreo"
  },
  {
    "name": "Share",
    "label": "Flecha de Compartir",
    "category": "Símbolos y Emociones",
    "tags": "difundir enviar amigos compartir"
  },
  {
    "name": "Airplay",
    "label": "Transmisión Inalámbrica",
    "category": "Robótica y Ciencia",
    "tags": "airplay pantalla compartir"
  },
  {
    "name": "AppWindow",
    "label": "Ventana de Videojuego",
    "category": "Juegos y Juguetes",
    "tags": "juego ventana app"
  },
  {
    "name": "Archive",
    "label": "Baúl de Coleccionista",
    "category": "Hogar y Casitas",
    "tags": "baul guardar coleccion"
  },
  {
    "name": "Barcode",
    "label": "Código de Barra Comercial",
    "category": "Símbolos y Emociones",
    "tags": "codigo barras juguete"
  },
  {
    "name": "BotOff",
    "label": "Robot Apagado en Reposo",
    "category": "Robótica y Ciencia",
    "tags": "robot durmiendo apagado"
  },
  {
    "name": "Cable",
    "label": "Cable de Carga Divertido",
    "category": "Robótica y Ciencia",
    "tags": "cable cargador enchufe"
  },
  {
    "name": "Cast",
    "label": "Transmitir a Pantalla",
    "category": "Robótica y Ciencia",
    "tags": "pantalla compartir cast"
  },
  {
    "name": "Contact",
    "label": "Libreta de Amigos",
    "category": "Lectura y Aprendizaje",
    "tags": "amigos libreta contactos"
  },
  {
    "name": "DatabaseZap",
    "label": "Base de Datos Veloz",
    "category": "Robótica y Ciencia",
    "tags": "computador datos veloz"
  },
  {
    "name": "DollarSign",
    "label": "Signo de Dinero Infantil",
    "category": "Símbolos y Emociones",
    "tags": "billete alcancia plata"
  },
  {
    "name": "Ear",
    "label": "Oído Atento para Música",
    "category": "Música y Sonido",
    "tags": "oreja oir escuchar"
  },
  {
    "name": "EyeOff",
    "label": "Ojos Cerrados para Jugar a las Escondidas",
    "category": "Símbolos y Emociones",
    "tags": "escondidas tapar ojos"
  },
  {
    "name": "FileAudio",
    "label": "Pista Musical Infantil",
    "category": "Música y Sonido",
    "tags": "audio cancion archivo"
  },
  {
    "name": "FileHeart",
    "label": "Carta con Dibujo de Corazón",
    "category": "Arte y Creatividad",
    "tags": "carta amor dibujo"
  },
  {
    "name": "HandHelping",
    "label": "Mano Amiga Solidaria",
    "category": "Bebés y Primera Infancia",
    "tags": "ayuda solidaridad amigos"
  },
  {
    "name": "HardDrive",
    "label": "Memoria de Juegos Guardados",
    "category": "Robótica y Ciencia",
    "tags": "disco juegos memoria"
  },
  {
    "name": "History",
    "label": "Reloj de Partidas Pasadas",
    "category": "Juegos y Juguetes",
    "tags": "historial turnos pasado"
  },
  {
    "name": "IdCard",
    "label": "Carnet de Detective Infantil",
    "category": "Juegos y Juguetes",
    "tags": "credencial carnet agente"
  },
  {
    "name": "Inbox",
    "label": "Buzón de Cartas Sorpresa",
    "category": "Hogar y Casitas",
    "tags": "buzon correo cartas"
  },
  {
    "name": "KeyRound",
    "label": "Llave Redonda de Castillo",
    "category": "Fantasía y Héroes",
    "tags": "llave secreta cerrojo"
  },
  {
    "name": "Landmark",
    "label": "Castillo o Museo Histórico",
    "category": "Fantasía y Héroes",
    "tags": "museo palacio historia"
  },
  {
    "name": "Layers2",
    "label": "Doble Capa de Ensamble",
    "category": "Juegos y Juguetes",
    "tags": "capas apilar bloques"
  },
  {
    "name": "LockOpen",
    "label": "Candado del Tesoro Abierto",
    "category": "Fantasía y Héroes",
    "tags": "abierto cofre premio"
  },
  {
    "name": "Mail",
    "label": "Sobre de Carta Sorpresa",
    "category": "Símbolos y Emociones",
    "tags": "carta correo sobre mensaje"
  },
  {
    "name": "MailCheck",
    "label": "Carta Entregada al Destino",
    "category": "Símbolos y Emociones",
    "tags": "mensaje verificado carta"
  },
  {
    "name": "MapPinOff",
    "label": "Ubicación Desconocida Oculta",
    "category": "Vehículos y Transporte",
    "tags": "secreto tesoro oculto"
  },
  {
    "name": "Monitor",
    "label": "Monitor de Computadora Gamer",
    "category": "Robótica y Ciencia",
    "tags": "pantalla gamer monitor"
  },
  {
    "name": "Mouse",
    "label": "Ratón de Computadora",
    "category": "Robótica y Ciencia",
    "tags": "mouse computador clic"
  },
  {
    "name": "Move3d",
    "label": "Movimiento en 3 Dimensiones",
    "category": "Robótica y Ciencia",
    "tags": "ejes 3d figuras volumen"
  },
  {
    "name": "Network",
    "label": "Red de Juguetes Conectados",
    "category": "Robótica y Ciencia",
    "tags": "red conexion jugar juntos"
  },
  {
    "name": "Octagon",
    "label": "Figura de Octágono",
    "category": "Juegos y Juguetes",
    "tags": "geometria ocho lados"
  },
  {
    "name": "Package2",
    "label": "Caja de Paquete Clásico",
    "category": "Juegos y Juguetes",
    "tags": "caja paquete envios"
  },
  {
    "name": "PackageMinus",
    "label": "Retirar Juguete del Paquete",
    "category": "Juegos y Juguetes",
    "tags": "quitar desempaque paquete"
  },
  {
    "name": "PackageSearch",
    "label": "Búsqueda del Paquete Perdido",
    "category": "Juegos y Juguetes",
    "tags": "buscar paquete regalo"
  },
  {
    "name": "PackageX",
    "label": "Paquete Cancelado",
    "category": "Juegos y Juguetes",
    "tags": "caja paquete cancelar"
  },
  {
    "name": "PanelTop",
    "label": "Techo de Casita",
    "category": "Hogar y Casitas",
    "tags": "panel techo casita"
  },
  {
    "name": "Pause",
    "label": "Pausa en la Partida",
    "category": "Juegos y Juguetes",
    "tags": "pausar juego descanso"
  },
  {
    "name": "PenLine",
    "label": "Trazar una Línea Recta",
    "category": "Arte y Creatividad",
    "tags": "linea trazo dibujo lapiz"
  },
  {
    "name": "Percent",
    "label": "Porcentaje de Gran Rebaja",
    "category": "Símbolos y Emociones",
    "tags": "porcentaje descuento oferta"
  },
  {
    "name": "Phone",
    "label": "Teléfono de Juguete",
    "category": "Robótica y Ciencia",
    "tags": "telefono llamada hablar"
  },
  {
    "name": "PhoneCall",
    "label": "Llamando a un Amigo",
    "category": "Robótica y Ciencia",
    "tags": "llamada sonar contestar"
  },
  {
    "name": "Plug",
    "label": "Enchufe Eléctrico de Seguridad",
    "category": "Robótica y Ciencia",
    "tags": "enchufe cable corriente"
  },
  {
    "name": "PlugZap",
    "label": "Enchufe con Chispa de Carga",
    "category": "Robótica y Ciencia",
    "tags": "carga rapida enchufe energia"
  },
  {
    "name": "PocketKnife",
    "label": "Navaja Suiza de Boy Scout",
    "category": "Deportes y Aire Libre",
    "tags": "navaja multiuso camping scout"
  },
  {
    "name": "Podcast",
    "label": "Programa Infantil de Radio",
    "category": "Música y Sonido",
    "tags": "podcast audio cuento microfono"
  },
  {
    "name": "Power",
    "label": "Botón de Encendido / Start",
    "category": "Robótica y Ciencia",
    "tags": "encendido prender power"
  },
  {
    "name": "PowerOff",
    "label": "Botón de Apagado para Dormir",
    "category": "Robótica y Ciencia",
    "tags": "apagar sleep reposo"
  },
  {
    "name": "Presentation",
    "label": "Pizarra Blanca de Exposición",
    "category": "Lectura y Aprendizaje",
    "tags": "pizarra exponer clase dibujos"
  },
  {
    "name": "Printer",
    "label": "Impresora de Dibujos para Colorear",
    "category": "Arte y Creatividad",
    "tags": "imprimir hojas colorear pintar"
  },
  {
    "name": "Projector",
    "label": "Proyector de Cine en Casa",
    "category": "Arte y Creatividad",
    "tags": "proyector peliculas cine dibujos"
  },
  {
    "name": "RadioReceiver",
    "label": "Receptor de Señales de Radio",
    "category": "Robótica y Ciencia",
    "tags": "receptor sintonizador ondas"
  },
  {
    "name": "Receipt",
    "label": "Tícket de Compras de la Tienda",
    "category": "Símbolos y Emociones",
    "tags": "recibo factura compra papel"
  },
  {
    "name": "RefreshCcw",
    "label": "Girar en Círculo hacia la Izquierda",
    "category": "Símbolos y Emociones",
    "tags": "girar rotar circulo"
  },
  {
    "name": "RefreshCw",
    "label": "Girar en Círculo hacia la Derecha",
    "category": "Símbolos y Emociones",
    "tags": "recargar actualizar giro"
  },
  {
    "name": "Rewind",
    "label": "Rebobinar la Cinta de Audio",
    "category": "Música y Sonido",
    "tags": "retroceder atras rebobinar musica"
  },
  {
    "name": "RotateCw",
    "label": "Giro Completo hacia la Derecha",
    "category": "Símbolos y Emociones",
    "tags": "rotar derecha avanzar"
  },
  {
    "name": "Save",
    "label": "Disquete de Guardar Partida",
    "category": "Juegos y Juguetes",
    "tags": "guardar partida disquete memoria"
  },
  {
    "name": "Scale",
    "label": "Balanza de Pesas de Mercadito",
    "category": "Juegos y Juguetes",
    "tags": "balanza pesar mercadito comparar"
  },
  {
    "name": "ScanLine",
    "label": "Línea de Escáner en Lectura",
    "category": "Robótica y Ciencia",
    "tags": "escanear laser linea lectura"
  },
  {
    "name": "ScanQrCode",
    "label": "Lector Especial de Código QR",
    "category": "Robótica y Ciencia",
    "tags": "qr escaner camara lectura"
  },
  {
    "name": "ScreenShare",
    "label": "Compartir Pantalla de Juego",
    "category": "Robótica y Ciencia",
    "tags": "pantalla compartir jugar red"
  },
  {
    "name": "Scroll",
    "label": "Pergamino Antiguo de Hechizos",
    "category": "Fantasía y Héroes",
    "tags": "pergamino mapa secreto mago"
  },
  {
    "name": "SearchCheck",
    "label": "Búsqueda Exitosa",
    "category": "Símbolos y Emociones",
    "tags": "encontrado hallazgo lupa check"
  },
  {
    "name": "Settings2",
    "label": "Ajustes Finos de Mecanismo",
    "category": "Robótica y Ciencia",
    "tags": "configuracion ajuste botones"
  },
  {
    "name": "Sheet",
    "label": "Hoja Cuadriculada de Cálculo",
    "category": "Lectura y Aprendizaje",
    "tags": "tabla hoja calculo notas"
  },
  {
    "name": "ShieldBan",
    "label": "Escudo de Zona Prohibida",
    "category": "Fantasía y Héroes",
    "tags": "prohibido bloqueo escudo"
  },
  {
    "name": "Square",
    "label": "Cuadrado Perfecto de Madera",
    "category": "Juegos y Juguetes",
    "tags": "figura cuadrado cuatro lados"
  },
  {
    "name": "SquareAsterisk",
    "label": "Caja con Clave Secreta",
    "category": "Fantasía y Héroes",
    "tags": "clave codigo password"
  },
  {
    "name": "SquareCode",
    "label": "Bloque de Programación",
    "category": "Robótica y Ciencia",
    "tags": "programar codigo bloques"
  },
  {
    "name": "SquareDot",
    "label": "Casilla Marcada con Punto",
    "category": "Juegos y Juguetes",
    "tags": "casilla ficha tablero"
  },
  {
    "name": "SquarePen",
    "label": "Cuadro para Escribir Notas",
    "category": "Arte y Creatividad",
    "tags": "escribir lapiz nota cuadro"
  },
  {
    "name": "SquarePlay",
    "label": "Botón Cuadrado de Vídeo",
    "category": "Arte y Creatividad",
    "tags": "video reproducir pantalla"
  },
  {
    "name": "Syringe",
    "label": "Jeringa de Juguete de Doctor",
    "category": "Juegos y Juguetes",
    "tags": "doctor veterinario enfermero curar"
  },
  {
    "name": "Table2",
    "label": "Tablero con Columnas",
    "category": "Lectura y Aprendizaje",
    "tags": "tabla columnas casillas datos"
  },
  {
    "name": "Tablet",
    "label": "Tableta Digital de Dibujo",
    "category": "Robótica y Ciencia",
    "tags": "tablet pantalla dibujar digital"
  },
  {
    "name": "TabletSmartphone",
    "label": "Dispositivos Conectados",
    "category": "Robótica y Ciencia",
    "tags": "tablet celular tecnologia"
  },
  {
    "name": "Terminal",
    "label": "Consola de Comando Hacker",
    "category": "Robótica y Ciencia",
    "tags": "consola hacker comandos terminal"
  },
  {
    "name": "Trash2",
    "label": "Bote de Basura Reciclable",
    "category": "Hogar y Casitas",
    "tags": "reciclar limpiar basurero tacho"
  },
  {
    "name": "Twitch",
    "label": "Transmisión en Vivo de Juegos",
    "category": "Juegos y Juguetes",
    "tags": "stream juegos directo chat"
  },
  {
    "name": "Undo2",
    "label": "Doble Vuelta Atrás",
    "category": "Juegos y Juguetes",
    "tags": "retroceder volver atras"
  },
  {
    "name": "Unlink",
    "label": "Desconectar Piezas",
    "category": "Juegos y Juguetes",
    "tags": "separar soltar piezas bloques"
  },
  {
    "name": "Upload",
    "label": "Subir Archivo de Dibujo",
    "category": "Arte y Creatividad",
    "tags": "subir enviar cargar"
  },
  {
    "name": "Usb",
    "label": "Llave de Memoria USB",
    "category": "Robótica y Ciencia",
    "tags": "pendrive memoria conexion"
  },
  {
    "name": "User",
    "label": "Figura de Jugador 1",
    "category": "Juegos y Juguetes",
    "tags": "personaje avatar nino jugador"
  },
  {
    "name": "UserCheck",
    "label": "Jugador Listo para Iniciar",
    "category": "Juegos y Juguetes",
    "tags": "listo confirmado jugador"
  },
  {
    "name": "UserPlus",
    "label": "Invitar a Nuevo Amigo",
    "category": "Juegos y Juguetes",
    "tags": "amigo sumar invitar juego"
  },
  {
    "name": "Users",
    "label": "Equipo Multijugador",
    "category": "Juegos y Juguetes",
    "tags": "amigos equipo grupo partida"
  },
  {
    "name": "UserRound",
    "label": "Avatar Redondo Divertido",
    "category": "Juegos y Juguetes",
    "tags": "personaje mono avatar redondo"
  },
  {
    "name": "UsersRound",
    "label": "Círculo de Amigos Jugando",
    "category": "Juegos y Juguetes",
    "tags": "grupo amigos ronda ninos"
  },
  {
    "name": "VideoOff",
    "label": "Cámara Apagada para Descanso",
    "category": "Arte y Creatividad",
    "tags": "camara off descanso privacidad"
  },
  {
    "name": "View",
    "label": "Vista Panorámica del Paisaje",
    "category": "Arte y Creatividad",
    "tags": "ver observar panorama paisaje"
  },
  {
    "name": "Voicemail",
    "label": "Mensaje de Voz de Fantasía",
    "category": "Robótica y Ciencia",
    "tags": "grabacion mensaje audio cassette"
  },
  {
    "name": "WalletCards",
    "label": "Billetera con Tarjetas de Juego",
    "category": "Símbolos y Emociones",
    "tags": "tarjetas dinero coleccionable"
  },
  {
    "name": "Webhook",
    "label": "Gancho de Grúa de Rescate",
    "category": "Herramientas y Taller",
    "tags": "grua gancho rescate colgar"
  },
  {
    "name": "Weight",
    "label": "Pesa de Calibración",
    "category": "Herramientas y Taller",
    "tags": "peso kilos balanza metal"
  },
  {
    "name": "WheatOff",
    "label": "Sin Espigas",
    "category": "Animales y Naturaleza",
    "tags": "sin trigo campo"
  },
  {
    "name": "Wine",
    "label": "Copa de Jugo Espumoso",
    "category": "Comida y Fiestas",
    "tags": "copa brindis fiesta cumpleanos"
  },
  {
    "name": "Workflow",
    "label": "Cadena de Montaje de Juguetes",
    "category": "Herramientas y Taller",
    "tags": "fabrica procesos paso a paso"
  },
  {
    "name": "ZoomIn",
    "label": "Lupa Acercando el Detalle",
    "category": "Robótica y Ciencia",
    "tags": "acercar detalle lupa aumentar"
  },
  {
    "name": "ZoomOut",
    "label": "Lupa Alejando el Paisaje",
    "category": "Robótica y Ciencia",
    "tags": "alejar panorama perspectiva"
  }
];
