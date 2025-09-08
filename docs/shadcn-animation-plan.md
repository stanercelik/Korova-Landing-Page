# Korova - shadcn/ui Animasyon Entegrasyonu

## 🎯 shadcn/ui ile Gerçekleştirilebilir Animasyonlar

### 1. Mevcut Animasyon Destekli Componentler

#### Carousel (Embla Carousel)
- **Testimonial Section**: Kullanıcı hikayelerini kaydırmalı gösterim
- **Movie Genre Showcase**: Film türlerini otomatik kaydıran carousel
- **Success Stories**: Başarı hikayelerini smooth geçişlerle

#### Dialog/Drawer
- **Modal Animations**: Smooth açılma/kapanma efektleri
- **Success Notifications**: Form gönderim sonrası celebratory modals
- **Info Overlays**: FAQ detayları için animated dialog

#### Accordion
- **FAQ Section**: Smooth expand/collapse animasyonları
- **Feature Lists**: Adım adım açıklama animasyonları

#### Tabs
- **Section Navigation**: Smooth geçişlerle bölüm değiştirme
- **Content Switching**: Farklı içerikler arası animasyonlu geçiş

### 2. Framer Motion + shadcn/ui Kombinasyonu

#### Hero Section Enhancements
```typescript
// Hero için enhanced carousel
<Carousel
  opts={{
    align: "center",
    loop: true,
    duration: 30 // Slow, cinematic speed
  }}
  plugins={[
    Autoplay({ delay: 4000, stopOnMouseEnter: true })
  ]}
  className="w-full max-w-4xl"
>
  <CarouselContent>
    {movieGenres.map((genre, index) => (
      <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="aspect-square">
            <CardContent className="p-6">
              {/* Genre visualization */}
            </CardContent>
          </Card>
        </motion.div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

#### Social Proof Carousel
```typescript
// Testimonial carousel with smooth animations
<Carousel
  opts={{
    align: "start",
    loop: true,
    dragFree: true
  }}
  plugins={[
    Autoplay({ 
      delay: 5000,
      stopOnInteraction: false 
    })
  ]}
  className="w-full max-w-6xl"
>
  <CarouselContent className="-ml-2 md:-ml-4">
    {testimonials.map((testimonial, index) => (
      <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
        <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-6">
            {/* Testimonial content */}
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="hidden md:flex" />
  <CarouselNext className="hidden md:flex" />
</Carousel>
```

### 3. FAQ Section Enhanced Accordion
```typescript
<Accordion type="single" collapsible className="space-y-4">
  {faqs.map((faq, index) => (
    <AccordionItem
      key={index}
      value={`item-${index}`}
      className="border border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-colors"
    >
      <AccordionTrigger className="text-left hover:text-primary transition-colors">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-5 w-5" />
          </motion.div>
          {faq.question}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pt-2 pb-4 text-muted-foreground"
        >
          {faq.answer}
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

### 4. Enhanced Button Animations
```typescript
// CTA buttons with enhanced interactions
<Button
  size="lg"
  className="relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90"
  onClick={handleSubmit}
>
  <motion.span
    className="relative z-10"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    Bekleme Listesine Katıl
  </motion.span>
  
  {/* Animated background effect */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
    initial={{ x: "-100%" }}
    whileHover={{ x: 0 }}
    transition={{ duration: 0.3 }}
  />
</Button>
```

### 5. Progress ve Loading States
```typescript
// Enhanced progress component
<Progress
  value={progress}
  className="w-full h-2"
>
  <motion.div
    className="h-full bg-primary rounded-full"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  />
</Progress>

// Loading skeleton for content
<div className="space-y-4">
  {Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} className="h-20 w-full" />
  ))}
</div>
```

### 6. Enhanced Form Components
```typescript
// Animated form with enhanced interactions
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="email">E-posta Adresiniz</Label>
    <div className="relative">
      <Input
        id="email"
        type="email"
        placeholder="ornek@email.com"
        className="pl-10 focus:ring-2 focus:ring-primary/20 transition-all"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      
      {/* Success indicator */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute right-3 top-3"
          >
            <Check className="h-4 w-4 text-green-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  
  <Button type="submit" className="w-full" disabled={isLoading}>
    {isLoading ? (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mr-2"
      >
        <Loader2 className="h-4 w-4" />
      </motion.div>
    ) : null}
    {isLoading ? "Kaydediliyor..." : "Listeye Katıl"}
  </Button>
</form>
```

### 7. Toast Notifications (Sonner)
```typescript
// Enhanced success notifications
const handleSuccess = () => {
  toast.success("Başarıyla kaydolundu!", {
    description: "Bekleme listesine eklendi.",
    action: {
      label: "Tamam",
      onClick: () => console.log("Tamam"),
    },
    duration: 5000,
  });
};

// Custom animated toast
const AnimatedToast = () => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className="flex items-center gap-3 p-4 bg-primary text-primary-foreground rounded-lg shadow-lg"
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.5, repeat: 1 }}
    >
      <Check className="h-5 w-5" />
    </motion.div>
    <div>
      <p className="font-semibold">Başarılı!</p>
      <p className="text-sm opacity-90">Bekleme listesine eklendi</p>
    </div>
  </motion.div>
);
```

### 8. Hover Card Enhancements
```typescript
// Enhanced hover cards for movie info
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link" className="p-0">
      Film Türü Eşleştirme
    </Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="space-y-2"
    >
      <h4 className="text-sm font-semibold">Film Türü Algoritması</h4>
      <p className="text-sm text-muted-foreground">
        Benzersiz film zevkinizi analiz ederek uyumlu kişilerle eşleştiriyoruz.
      </p>
      <div className="flex items-center pt-2">
        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
        <span className="text-xs text-muted-foreground">
          Güncellenme: Aralık 2024
        </span>
      </div>
    </motion.div>
  </HoverCardContent>
</HoverCard>
```

## 🚀 Uygulama Planı

### Öncelik 1: Carousel Implementation
1. Social Proof section için testimonial carousel
2. Hero section için movie genre showcase
3. Smooth autoplay ve drag interactions

### Öncelik 2: Enhanced FAQ Accordion
1. Smooth expand/collapse animasyonları
2. Icon rotations ve state changes
3. Hover effects ve focus states

### Öncelik 3: Form Enhancements
1. Input focus animations
2. Validation state indicators
3. Loading states ve success feedback

### Öncelik 4: Toast Notifications
1. Success message systemı
2. Error handling ile animated feedback
3. Custom toast designs

Bu plan ile shadcn/ui'ın gücünü Framer Motion ile birleştirerek sinematik ve smooth bir deneyim yaratılabilir. Hangi komponenti önce entegre etmek istiyorsun?