import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Users,
  CreditCard,
  Clock,
  Shield,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function Home() {
  const dashboardUrl = "/dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-amber-50 to-orange-100/95 backdrop-blur supports-[backdrop-filter]:bg-amber-50/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <a href="" className="text-xl text-orange-800">
              Mengamar
            </a>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Xususiyatlar
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Qanday ishlaydi
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Narxlar
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Fikrlar
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Savol-javoblar
            </a>
          </nav>
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex bg-orange-500 hover:bg-orange-400 text-white shadow-md"
          >
            <Link to={dashboardUrl}>Bepul sinab ko‘ring</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-amber-50 to-orange-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-orange-800">
                  Obuna boshqaruvi{" "}
                  <span className="text-orange-600">Oddiy qilib yarating</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Bizning kuchli boshqaruv tizimimiz bilan obuna biznesingizni
                  soddalashtiring. Hisob-kitoblarni avtomatlashtiring, chiqib
                  ketishni kamaytiring va biznesingizni osonlikcha kengaytiring.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button
                  asChild
                  className="w-full text-lg bg-orange-500 hover:bg-orange-400 text-white shadow-md"
                >
                  <Link to={dashboardUrl}>
                    Bepul sinab ko'ring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-xs text-gray-600">
                  Kredit karta talab qilinmaydi. 14 kunlik bepul sinov.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-amber-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Xususiyatlar
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Obunalarni boshqarish uchun kerakli barcha narsalar
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bizning platformamiz obuna biznesingizni samarali boshqarish
                  uchun kerakli barcha vositalarni taqdim etadi.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BarChart className="h-10 w-10 text-orange-500" />
                  <CardTitle className="mt-4 text-orange-800">
                    Analitika boshqaruv paneli
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Obuna statistikangizni real vaqt rejimida tahlil qiling.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Daromadlarni kuzatish
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Chiqish tahlili</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Mijozning umr bo'yi qiymati
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-10 w-10 text-orange-500" />
                  <CardTitle className="mt-4 text-orange-800">
                    Mijozlarni boshqarish
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Kuchli mijozlar vositalari yordamida obunachilaringizni
                    boshqaring.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Mijoz profillari</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Obuna tarixchasi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Aloqa vositalari</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CreditCard className="h-10 w-10 text-orange-500" />
                  <CardTitle className="mt-4 text-orange-800">
                    Hisob-kitobni avtomatlashtirish
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Hisob-kitob va hisob-fakturalarni avtomatlashtiring.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Takroriy to'lovlar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Hisob-faktura yaratish
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        To'lovlarni qayta ishlash
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-orange-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Qanday ishlaydi
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Obuna muvaffaqiyatiga oddiy qadamlar
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mengamar bilan bir necha oddiy qadamlar bilan boshlang.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">
                  Ro'yxatdan o'tish
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Hisobingizni yarating va to'lov shlyuzingizni ulang.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">
                  Rejalarni sozlash
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Obuna rejalarini va narxlar darajasini sozlang.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">
                  Integratsiya
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Oddiy kod yordamida veb-saytingizga to'lov jarayonini
                  qo'shing.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  4
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">
                  Rivojlanish
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Analitikani kuzating va obuna biznesingizni kengaytiring.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-400 text-white shadow-md"
              >
                <Link to={dashboardUrl}>
                  Hozir boshlang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-amber-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Narxlar
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Oddiy va shaffof narxlar
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Biznesingiz uchun mos reja tanlang.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">
                    Boshlang'ich
                  </CardTitle>
                  <div className="text-3xl font-bold text-orange-600">
                    $29
                    <span className="text-sm font-normal text-gray-600">
                      /oy
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    Kichik bizneslar uchun ideal, endigina boshlayotganlar
                    uchun.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        100 tagacha obunachilar
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Asosiy analitika</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Elektron pochta yordami
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md"
                  >
                    <Link to={dashboardUrl}>Boshlash</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-orange-500 bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center">
                    <div className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                      Eng ommabop
                    </div>
                  </div>
                  <CardTitle className="text-orange-800">
                    Professional
                  </CardTitle>
                  <div className="text-3xl font-bold text-orange-600">
                    $79
                    <span className="text-sm font-normal text-gray-600">
                      /oy
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    Ko'proq obunachilarga ega o'sayotgan bizneslar uchun ideal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        1,000 tagacha obunachilar
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Kengaytirilgan analitika
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Birinchi navbatdagi yordam
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Maxsus brending</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md"
                  >
                    <Link to={dashboardUrl}>Boshlash</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">Korporativ</CardTitle>
                  <div className="text-3xl font-bold text-orange-600">
                    $199
                    <span className="text-sm font-normal text-gray-600">
                      /oy
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    Murakkab ehtiyojlarga ega yirik bizneslar uchun.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Cheksiz obunachilar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        To'liq analitika to'plami
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">24/7 maxsus yordam</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">API ulanishi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">
                        Maxsus integratsiyalar
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md"
                  >
                    <Link to={dashboardUrl}>Boshlash</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-orange-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Fikrlar
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Dunyo bo'ylab bizneslar tomonidan ishonchli
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mijozlarimizning Mengamar haqidagi fikrlarini ko'ring.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100"></div>
                    <div>
                      <CardTitle className="text-base text-orange-800">
                        Sarah Johnson
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        TechStart direktori
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    "Mengamar bizning obuna biznesimizni boshqarish uslubimizni
                    o'zgartirdi. Faqat analitika yordamida daromadimizni uch oy
                    ichida 30% ga oshirdik."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100"></div>
                    <div>
                      <CardTitle className="text-base text-orange-800">
                        Michael Chen
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        SubscribeBox asoschisi
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    "Hisob-kitob avtomatlashtirish bizga son-sanoqsiz soatlar
                    qo'lda ishlashdan xalos qildi. Endi jamoamiz to'lovlarni
                    boshqarish o'rniga biznesni rivojlantirishga e'tibor
                    qaratmoqda."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100"></div>
                    <div>
                      <CardTitle className="text-base text-orange-800">
                        Emily Rodriguez
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        GrowthMedia marketing direktori
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    "Mijozlarni boshqarish hech qachon bunchalik oson bo'lmagan.
                    Obunachilarimiz haqida hamma narsani bir joyda ko'rishimiz
                    va natijada yaxshiroq xizmat ko'rsatishimiz mumkin."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-amber-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Savol-javoblar
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Tez-tez beriladigan savollar
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mengamar haqida tez-tez beriladigan savollarga javoblar
                  toping.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    14 kunlik bepul sinov qanday ishlaydi?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Mengamar-ga ro'yxatdan o'tib, 14 kun davomida barcha
                    funksiyalardan hech qanday to'lov ma'lumotisiz
                    foydalanishingiz mumkin. Sinov muddati tugagach,
                    ehtiyojlaringizga mos reja tanlashingiz mumkin.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    Keyinchalik rejalarni o'zgartirish mumkinmi?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Ha, siz istalgan vaqtda rejangizni yangilashingiz yoki
                    pasaytirishingiz mumkin. Obunangizdagi o'zgarishlar to'lov
                    davringizning qolgan qismiga mutanosib ravishda hisoblanadi.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    Qaysi to'lov shlyuzlari qo'llab-quvvatlanadi?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Mengamar Stripe, PayPal, Braintree va boshqa yirik to'lov
                    shlyuzlari bilan integratsiyalashgan. Agar sizda maxsus
                    shlyuz bo'lsa, qo'llab-quvvatlash jamoamizga murojaat
                    qiling.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    Obunachilar sonida cheklov bormi?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Boshlang'ich reja 100 tagacha obunachini, Professional reja
                    1,000 tagacha obunachini, Korporativ reja esa cheksiz
                    obunachilarni qo'llab-quvvatlaydi.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    Ma'lumotlarim qanchalik xavfsiz?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Biz xavfsizlikka jiddiy yondashamiz. Barcha ma'lumotlar
                    tranzitda va dam olishda shifrlanadi. Biz SOC 2
                    standartlariga mos kelamiz va ma'lumotlaringizni himoya
                    qilish uchun muntazam xavfsizlik tekshiruvlarini o'tkazamiz.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Obuna boshqaruvini soddalashtirishga tayyormisiz?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                  Obuna ehtiyojlari uchun Mengamar-ga ishonadigan minglab
                  bizneslarga qo'shiling.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button
                  asChild
                  variant="secondary"
                  className="w-full text-lg bg-white text-orange-600 hover:bg-gray-100 shadow-md"
                  size="lg"
                >
                  <Link to={dashboardUrl}>
                    Bepul sinab ko'ring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-xs">
                  Kredit karta talab qilinmaydi. 14 kunlik bepul sinov.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-amber-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Aloqa
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Biz bilan bog'laning
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Savollaringiz bormi? Jamoamiz yordam berishga tayyor.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">
                    Aloqa ma'lumotlari
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-gray-700">
                      support@mengamar.com
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-gray-700">
                      Dushanba - Juma, 9:00 - 17:00 EST
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Shield className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-gray-700">SOC 2 mosligi</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">
                    Demo rejalashtirish
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Mengamar-ni amalda ko'rishni xohlaysizmi? Jamoamiz bilan
                    shaxsiy demo rejalashtiring.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md"
                  >
                    <Link to={dashboardUrl}>Demo rejalashtirish</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-amber-50">
        <div className="container mx-auto flex flex-col gap-6 md:h-24 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Mengamar. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-orange-600"
            >
              Foydalanish shartlari
            </Link>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-orange-600"
            >
              Maxfiylik
            </Link>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-orange-600"
            >
              Cookie fayllari
            </Link>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-orange-600"
            >
              Xavfsizlik
            </Link>
          </div>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-700 hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-gray-700 hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link to="#" className="text-gray-700 hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
