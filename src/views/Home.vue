<template>  
    <div>
        <HeroBannerHome/>
        <FeatureSectionHome/>
        <AboutSectionHome/>
        <OffterSectionHome/>
        <SolutionSectionHome/>
        <PricingSectionHome/>
        <TestimonialSectionHome/>
        <ClientsLogoHome/>
    </div>     
</template>

<script>
import HeroBannerHome from './section/HeroBannerHome'
import FeatureSectionHome from './section/FeatureSectionHome'
import AboutSectionHome from './section/AboutSectionHome'
import OffterSectionHome from './section/OffterSectionHome'
import SolutionSectionHome from './section/SolutionSectionHome'
import PricingSectionHome from './section/PricingSectionHome'
import TestimonialSectionHome from './section/TestimonialSectionHome'
import ClientsLogoHome from './section/ClientsLogoHome'

export default {
  name: 'Start',  
  components: {
    HeroBannerHome,
    FeatureSectionHome,
    AboutSectionHome,
    OffterSectionHome,
    SolutionSectionHome,
    PricingSectionHome,
    TestimonialSectionHome,
    ClientsLogoHome
  },
  methods: {
    
  }
}
</script>

