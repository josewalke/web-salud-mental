import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Smartphone, Brain, Users, Clock, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = useMemo(() => [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Detox Digital Guiado",
      description: "Programa estructurado de desintoxicación digital con meditaciones y ejercicios específicos para reducir la dependencia tecnológica.",
      image: "https://images.unsplash.com/photo-1555819207-d089c9205ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3RyZXNzJTIwZGlzY29ubmVjdHxlbnwxfHx8fDE3NTQ0OTcyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Planes personalizados", "Seguimiento diario", "Recordatorios inteligentes"],
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      title: "Mindfulness Offline",
      description: "Técnicas de atención plena diseñadas para practicar sin dispositivos, reconectando con el momento presente y la conciencia corporal.",
      image: "https://images.unsplash.com/photo-1587721913348-05e5c563bc3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5kZnVsbmVzcyUyMG5hdHVyZSUyMHBlYWNlfGVufDF8fHx8MTc1NDQ5NzI5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Ejercicios de respiración", "Meditación caminando", "Conexión con la naturaleza"],
      color: "from-indigo-500 to-indigo-700"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Reconexión Social",
      description: "Terapia grupal e individual enfocada en mejorar las relaciones interpersonales reales y reducir el aislamiento digital.",
      image: "https://images.unsplash.com/photo-1740016755874-823610638af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMGNvbm5lY3Rpb24lMjB0aGVyYXB5fGVufDF8fHx8MTc1NDQ5NzMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Sesiones grupales", "Terapia individual", "Actividades presenciales"],
      color: "from-purple-500 to-purple-700"
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Rutinas de Desconexión",
      description: "Programas estructurados para establecer límites saludables con la tecnología y crear espacios libres de dispositivos.",
      image: "https://images.unsplash.com/photo-1634585605949-8f1e029af923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1NDQ5NzI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: ["Horarios personalizados", "Zonas libres de tech", "Rituales de desconexión"],
      color: "from-cyan-500 to-cyan-700"
    }
  ], []);

  return (
    <section id="servicios" className="py-20 relative overflow-hidden">
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-white/60"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
            "linear-gradient(225deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
            "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ textShadow: '0 2px 4px rgba(255, 255, 255, 0.5)' }}
          >
            Nuestros Servicios de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Reconexión</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }}
          >
            Ofrecemos cuatro programas especializados para ayudarte a recuperar el equilibrio
            entre tu vida digital y tu bienestar mental.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: 5,
                scale: 1.02
              }}
              style={{ transformStyle: "preserve-3d" }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="group h-full border-blue-100/50 hover:border-blue-200/70 transition-all duration-500 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-blue-200/30 overflow-hidden">
                <div className="relative overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover transition-all duration-500"
                    />
                  </motion.div>

                  {/* Overlay con gradiente animado */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />

                  {/* Icono flotante */}
                  <motion.div
                    className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      rotateY: 10,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
                    }}
                    animate={{
                      y: hoveredCard === index ? [-2, 2, -2] : 0,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {service.icon}
                  </motion.div>
                </div>

                <CardHeader className="pb-4">
                  <motion.div
                    animate={{ x: hoveredCard === index ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardTitle className="text-gray-900 text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-6 pt-0">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-blue-600 rounded-full mr-3"
                          animate={{
                            scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300`}
                    >
                      Explorar servicio
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 