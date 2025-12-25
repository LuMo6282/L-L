'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Post-it images from Cloudinary
const postItImages = [
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/1_vont6l.png',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/2_te3mnb.png',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/3_qneyws.png',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/4_c7o9zc.png',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/5_xedgzr.png',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/6_pauikt.png',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766672295/7_qmhki6.png',
]

// Specific photos that should have post-its (matched from user's screenshots)
const photosWithPostIts: Record<string, number> = {
  // Couple selfie with blurred edges (woman white shirt, guy in cafe)
  'IMG_0338_lhpnz0': 0,
  // Group study shot at mall (3 people with laptops)
  'IMG_2655_uxluav': 1,
  // Formal event selfie (purple lighting)
  'IMG_7293_pevntj': 2,
  // Couple at house with peace sign (maroon hoodie)
  'Parties_ggopam': 3,
  // Guy with MILF shirt
  'IMG_3403_nvb3zy': 4,
  // FaceTime screenshot (guitar)
  'IMG_2543_c6w4tp': 5,
}

// Memory pages data - using Cloudinary URLs without version numbers for better compatibility
const memoryPages: Record<string, {
  title: string
  subtitle: string
  date: string
  description: string
  color: string
  heroPosition?: string // CSS object-position for hero image (e.g., 'center bottom')
  photos: { src: string; alt: string; caption?: string; isVideo?: boolean }[]
  sections?: {
    title: string
    coverImage: string
    photos: { src: string; alt: string; caption?: string; isVideo?: boolean }[]
  }[]
}> = {
  'seattle': {
    title: 'Washington',
    subtitle: 'The beginning',
    date: 'November 29, 2023',
    description: '"Just a halloween party"',
    color: '#7EC8E3',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0338_lhpnz0.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2655_uxluav.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2458_nfmuim.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1653_uuup28.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1631_ytbzgo.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1534_ob4zca.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0714_f9gk9y.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/Parties_ggopam.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7293_pevntj.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3994_mwpxwq.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3403_nvb3zy.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2543_c6w4tp.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2183_cldeyi.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0664_i5sgs4.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0650_dgq0cm.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7332_uyamie.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7234_sme5yq.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_5701_aciwcw.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2233_jxpmku.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2051_qw3pfs.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1824_zgfni4.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1261_tvza3c.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1085_yhyj3z.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0617_kfixf4.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_8827_ano7nq.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0611_ayccui.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7987_nwm0qi.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_5622_ov19b1.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2525_dhknjr.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2237_pifvk1.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0614_lwyxfs.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_6747_mhjql6.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3294_jczzdg.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2559_q0cthb.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2180_q93qdr.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2175_muxrci.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1428_bxryku.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0999_z0rydt.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0751_mbcohw.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0679_azqqve.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0672_ba960w.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_9558_eledwg.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7829_uus3wi.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7279_yhw77h.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7258_tyglpn.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_6749_e5oo9b.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3921_uqg83h.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2442_dn1etl.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1260_vvlizp.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7326_aqrxlj.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3176_e5apq9.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2655_k7g9e2.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7829_rniga9.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7279_fyvmhn.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2171_vplnzn.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1875_syduyj.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7330_hnyvn9.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3965_donlib.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_4998_znqfpm.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3441_oqsjub.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3948_mci8ft.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3161_k0e06o.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7265_ascdud.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0860_qce3sn.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0860_wbxj9c.jpg', alt: 'Washington memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1875_azmovw.jpg', alt: 'Washington memory' },
    ],
  },
  'mexico': {
    title: 'Mexico',
    subtitle: 'First Trip Together',
    date: 'January 20, 2024',
    description: 'More fun with you',
    color: '#F4A460',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606903/IMG_0619_s1sdxw.jpg', alt: 'Mexico sunset' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606923/IMG_6409_eluswj.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606918/IMG_6290_w9tjqs.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606914/IMG_1344_znfc31.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606913/IMG_0616_aau1of.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606911/IMG_0615_iw4amc.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606910/IMG_0613_uqsncw.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606908/100_0170_jloyaz.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606906/100_0157_ixuxro.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606905/IMG_1190_ascmch.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606901/IMG_0618_lbg6sa.jpg', alt: 'Mexico memory' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606900/IMG_0617_fplxqh.jpg', alt: 'Mexico memory' },
    ],
  },
  'formal': {
    title: 'Formal Events',
    subtitle: 'Dressed to Impress',
    date: '2024',
    description: 'Tolo, Prom, and Telluride Formal - our nights to remember.',
    color: '#DDA0DD',
    photos: [],
    sections: [
      {
        title: 'TOLO',
        coverImage: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606999/IMG_0475_emzphe.jpg',
        photos: [
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607008/IMG_0521_f0fys3.jpg', alt: 'TOLO' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607006/IMG_0348_g8rdkt.jpg', alt: 'TOLO' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606999/IMG_0475_emzphe.jpg', alt: 'TOLO' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606995/IMG_1445_uu1dl8.jpg', alt: 'TOLO' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606991/IMG_0347_ummbqd.jpg', alt: 'TOLO' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606980/IMG_0457_ptmvnz.jpg', alt: 'TOLO' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606956/IMG_0136_fqkjr1.jpg', alt: 'TOLO' },
        ],
      },
      {
        title: 'Prom',
        coverImage: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607001/IMG_2777_ltlnsu.jpg',
        photos: [
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607012/PROM_2024_0266_tichei.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607003/IMG_2932_ba3ea0.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607001/IMG_2777_ltlnsu.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606996/IMG_3051_esaznd.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606986/IMG_4113_jcwy1t.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606984/PROM_2024_0259_eoelyr.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606977/PROM_2024_0698_rpcpg8.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606969/IMG_2996_yvpawb.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606974/PROM_2024_0701_hfd0wd.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606973/IMG_4692_ppzhed.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606968/IMG_2874_hro8kp.jpg', alt: 'Prom' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606966/IMG_1864_glb98y.jpg', alt: 'Prom' },
        ],
      },
      {
        title: 'Telluride Formal',
        coverImage: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606964/IMG_0449_kcu8pg.jpg',
        photos: [
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606993/IMG_0415_im2buc.jpg', alt: 'Telluride Formal' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606988/IMG_8837_wixh8s.jpg', alt: 'Telluride Formal' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606978/IMG_0442_zvatti.jpg', alt: 'Telluride Formal' },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606960/IMG_0164_zf2xsr.mov', alt: 'Telluride Formal', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606964/IMG_0449_kcu8pg.jpg', alt: 'Telluride Formal' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606990/IMG_8848_ojyaqj.jpg', alt: 'Telluride Formal' },
        ],
      },
    ],
  },
  'whistler': {
    title: 'Whistler',
    subtitle: 'Mountain Adventures',
    date: 'February 20, 2024',
    description: 'Snow-capped peaks and cozy moments.',
    color: '#B8D4E3',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628280/IMG_0626_oz2ddu.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628318/IMG_0622_wt2m5z.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628317/IMG_0621_rflq98.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628316/IMG_0620_vapcfk.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628315/IMG_3540_chotdo.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766628315/IMG_0059_zcewhf.mov', alt: 'Whistler', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628312/IMG_5998_l21dsm.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628283/IMG_1913_c5w9qd.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628282/IMG_1899_p65dd0.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628279/IMG_0625_f2n0xm.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628279/IMG_0624_lrjpvi.jpg', alt: 'Whistler' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628279/IMG_0623_gfxae7.jpg', alt: 'Whistler' },
    ],
  },
  'graduation': {
    title: 'Graduation',
    subtitle: 'A Milestone Together',
    date: 'June 8, 2024',
    description: 'Celebrating achievements and new beginnings.',
    color: '#98D8C8',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608102/IMG_4813_qflidx.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608116/IMG_7308_rvsxip.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608115/IMG_3501_lcak1g.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608111/IMG_3322_kinf3v.mov', alt: 'Graduation', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608108/IMG_3322_kw5pup.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608106/IMG_3223_nko1ar.mov', alt: 'Graduation', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608104/IMG_3223_welyh1.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608099/IMG_4821_vfrmi4.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608097/IMG_3317_c4mpti.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608095/IMG_7296_aqmtla.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608092/IMG_4814_jwoavy.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608091/IMG_3330_hl24zb.mp4', alt: 'Graduation', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608090/img_0372_qhofbh.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608086/IMG_3280_sla95k.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608083/img_0443_stoaio.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608082/GRAD_2024_003_yyn7xb.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608080/IMG_7313_a1aqh5.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608077/IMG_3304_cxgozd.mov', alt: 'Graduation', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608075/img_0477_cmk5uk.jpg', alt: 'Graduation' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608072/img_0443-1_xq1nnl.jpg', alt: 'Graduation' },
    ],
  },
  'another-summer-week': {
    title: 'Another Summer Week',
    subtitle: 'Music, Adventure, and Alpine Beauty',
    date: 'July 6, 2024',
    description: 'Odesza lights, ATV thrills, and hiking through the Enchantments.',
    color: '#FF9F43',
    photos: [],
    sections: [
      {
        title: 'Odesza',
        coverImage: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607178/IMG_5885_r2xtlx.jpg',
        photos: [
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607178/74201197218__FE714C64-B046-41FF-896E-C15F2DCA5AEF_mi8f55.jpg', alt: 'Odesza' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607178/IMG_5885_r2xtlx.jpg', alt: 'Odesza' },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607178/Odesza_fykrrm.mp4', alt: 'Odesza', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607144/IMG_4196_vciz1y.jpg', alt: 'Odesza' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607142/IMG_4164_xxzay5.jpg', alt: 'Odesza' },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607140/IMG_5865_o2buoj.mp4', alt: 'Odesza', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607140/IMG_4141_pqcl6l.jpg', alt: 'Odesza' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607138/FullSizeRender_tfo6p1.jpg', alt: 'Odesza' },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607136/IMG_5897_t1ggfv.mp4', alt: 'Odesza', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607135/IMG_5869_hdzfgt.mp4', alt: 'Odesza', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607133/IMG_5868_orkhsn.mp4', alt: 'Odesza', isVideo: true },
        ],
      },
      {
        title: 'ATV',
        coverImage: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608197/IMG_3563_npambj.jpg',
        photos: [
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608197/IMG_3563_npambj.jpg', alt: 'ATV' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608192/IMG_1305_vxjqpj.jpg', alt: 'ATV' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608191/74232796170__C668386F-FCC1-4F41-BAB4-2965577B41C9_ifqlg7.jpg', alt: 'ATV' },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608188/IMG_1305_gg6f2o.mov', alt: 'ATV', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608185/IMG_2617_twcjjo.jpg', alt: 'ATV' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608184/IMG_3634_xvamt2.jpg', alt: 'ATV' },
          { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608181/IMG_8678_dsxsav.mp4', alt: 'ATV', isVideo: true },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608180/IMG_7944_w2ffnz.jpg', alt: 'ATV' },
        ],
      },
      {
        title: 'Enchantments',
        coverImage: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607756/IMG_6233_txmjej.jpg',
        photos: [
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607777/IMG_6187_agbjei.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607776/IMG_4493_gqcehp.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607771/Enchantments_j3a00r.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607769/IMG_6216_gk41vb.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607767/IMG_6055_eppzb1.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607761/IMG_6206_eczj0d.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607762/IMG_6110_vr6wzm.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607758/IMG_6246_k2izh0.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607756/IMG_6233_txmjej.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607754/IMG_6047_or9ljs.jpg', alt: 'Enchantments' },
          { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607751/IMG_6029_t7epeh.jpg', alt: 'Enchantments' },
        ],
      },
    ],
  },
  'fred-again': {
    title: 'Fred Again',
    subtitle: 'An Unforgettable Night',
    date: 'September 11, 2024',
    description: 'Music that moved us and memories that last.',
    color: '#FF6B6B',
    photos: [],
  },
  'colorado': {
    title: 'Colorado',
    subtitle: 'Mile High Memories',
    date: 'September 2024',
    description: 'From the Boulderthon to breathtaking views.',
    color: '#8B4513',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607091/IMG_0636_k3ensl.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607114/IMG_9356_qedrkx.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607112/IMG_8148_bx2rtv.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607109/IMG_7857_sbu660.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607108/IMG_7856_dbn5fs.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607105/IMG_7595_djpkk4.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607104/IMG_9358_fqwzmy.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607100/IMG_6812_tyzs2o.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607098/IMG_0846_qwolsy.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607095/IMG_0685_loigne.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607093/IMG_0677_nttye4.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607089/IMG_9364_q3vrv8.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607085/IMG_9082_nebmyc.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607083/IMG_8105_rqcscq.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607081/IMG_8100_keb6c4.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607079/IMG_7847_fbcdek.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607077/IMG_7497_hnwaes.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607075/IMG_0645_ig9jlh.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607074/IMG_9483_y6zbt6.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607072/IMG_3403-1_xwitxs.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607070/IMG_1013_vlruy5.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607068/IMG_0848_r7c9wz.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607066/IMG_0683_k9byg3.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607064/IMG_0668_s5vja0.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607062/IMG_0656_rkgbpg.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607061/IMG_0560_fpm2sa.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607059/IMG_9654_ivfnvg.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607057/IMG_8156_tvnsug.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607055/IMG_7590_njitby.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607054/IMG_1011_z2d0wm.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607052/IMG_8331_k0xwlw.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607050/IMG_0845_qxv4st.jpg', alt: 'Colorado' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607048/IMG_0633_fzbedj.jpg', alt: 'Colorado' },
    ],
  },
  'sand-dunes': {
    title: 'Sand Dunes',
    subtitle: 'Desert Adventures',
    date: '2024',
    description: 'Exploring the golden dunes together.',
    color: '#D4A574',
    heroPosition: 'center center',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766630342/IMG_0821_wetrog.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607264/IMG_8005_hjjezl.mov', alt: 'Sand Dunes', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607262/IMG_7647_hmwb7r.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607259/IMG_0216_l0jy4y.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607258/IMG_7710_jvsmvw.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607255/IMG_7730_l2vque.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607253/IMG_7939_cttqmx.mov', alt: 'Sand Dunes', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607251/IMG_7776_ruchx3.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607249/IMG_7704_lxx3dy.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607246/IMG_7701_oy5r9n.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607245/IMG_7696_epqf5f.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607244/IMG_7644_dsumic.mp4', alt: 'Sand Dunes', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607241/IMG_7983_arjfyh.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607239/IMG_0202_orphbp.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607237/IMG_0193_f2qhod.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607216/IMG_7964_jeqfep.mov', alt: 'Sand Dunes', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607206/IMG_7779_krzxaz.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766607203/IMG_7688_vueog2.mp4', alt: 'Sand Dunes', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607203/IMG_7774_daf1rz.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607202/IMG_7735_yauppn.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607199/IMG_7698_ddo8ea.jpg', alt: 'Sand Dunes' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607196/IMG_7682_c2kfoq.jpg', alt: 'Sand Dunes' },
    ],
  },
  'rise-festival': {
    title: 'Rise Festival',
    subtitle: 'Lanterns in the Desert Sky',
    date: 'October 3, 2024',
    description: 'Releasing lanterns into the night sky, watching our wishes float among thousands of lights.',
    color: '#FF8C42',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608223/IMG_0948_paf4mg.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608455/IMG_0797_ck8agv.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608455/IMG_0798_vdnpea.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766608455/IMG_6669_bqcsjl.mov', alt: 'Rise Festival', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608235/IMG_0949_xq3wtr.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608232/IMG_0945_fkpwpm.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608228/IMG_0941_ycuwew.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608225/IMG_0939_cyjmpf.jpg', alt: 'Rise Festival' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608221/IMG_0936_x1fbpn.jpg', alt: 'Rise Festival' },
    ],
  },
  'alaska': {
    title: 'Alaska',
    subtitle: 'The Last Frontier',
    date: '2024',
    description: 'Adventures in the wild, breathtaking landscapes and unforgettable moments.',
    color: '#5B9BD5',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606657/IMG_0637_c5wlte.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606675/IMG_0635_tznwhd.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606673/IMG_0634_nt4opg.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606672/IMG_0633_zbcqhd.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606671/IMG_0632_sfunkk.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606670/IMG_9229_chceej.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606668/IMG_9215_jnczgy.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606666/IMG_9168_ncsluo.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606666/IMG_0644_lro4ew.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606664/IMG_0643_jdxptz.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606663/IMG_0642_cbtysy.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606662/IMG_0641_tt4w0p.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606659/IMG_0639_qfgvnh.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606659/IMG_0638_lznvuw.jpg', alt: 'Alaska' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606656/IMG_0636_upkuua.jpg', alt: 'Alaska' },
    ],
  },
  'road-trip': {
    title: 'Road Trip',
    subtitle: 'Open Roads and Endless Horizons',
    date: 'March 19, 2025',
    description: 'Chasing sunsets and making memories mile after mile.',
    color: '#E67E22',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606596/IMG_0280_l2aeb1.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606824/IMG_0436_q5n9wu.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606823/TRS_0000_gksbn3.mp4', alt: 'Road Trip', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606821/IMG_3231_fhsayu.mov', alt: 'Road Trip', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606821/IMG_9976_ikbjnm.mov', alt: 'Road Trip', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606820/IMG_0517_fln8ph.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606819/IMG_0513_ucd3lp.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606622/IMG_0080_eosu4y.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606620/IMG_0039_eof0li.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606618/IMG_0600_uo19td.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606617/IMG_0602_aesyp8.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606615/IMG_0549_oyl6je.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606613/IMG_0533_jzriqq.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606612/IMG_0454_dzn2fh.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606611/IMG_0440_hpyasc.mov', alt: 'Road Trip', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606606/IMG_0402_ox3fpb.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606602/IMG_0353_yzotik.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606599/IMG_0341_t2cc48.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606597/IMG_0339_mjbctw.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606595/IMG_0273_cvtvya.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606593/IMG_0263_mzd6v4.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606592/IMG_0258_w4tzeb.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606590/IMG_0242_mpzjoc.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606589/IMG_0241_uefsh5.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606587/IMG_0239_nujz9d.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606587/IMG_0237_al2lac.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606584/IMG_0233_poonf5.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606583/IMG_0191_ad5bqr.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606581/IMG_0188_j2l3am.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606579/IMG_0157_ib05ue.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606577/IMG_0149_lamkga.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606574/IMG_0129_blrz23.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606573/TRS_0005_pujlpm.mp4', alt: 'Road Trip', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606571/TRS_0002-1_pkliym.mp4', alt: 'Road Trip', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606568/IMG_9889_z9pfur.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606566/IMG_3281_vkabbl.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606565/IMG_0687_mntezr.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606564/IMG_0686_gux1z1.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606562/IMG_0685_p08ovl.jpg', alt: 'Road Trip' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606549/IMG_0080_gq6cah.mov', alt: 'Road Trip', isVideo: true },
    ],
  },
  'whidbey': {
    title: 'Whidbey',
    subtitle: 'Island Escapes',
    date: '2024',
    description: 'Coastal memories and peaceful island moments.',
    color: '#7EC8A8',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606469/IMG_5748_iht5zc.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606485/IMG_0221_pqqt2e.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606484/IMG_0195_mnac5t.mp4', alt: 'Whidbey', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606484/IMG_0218_vaxrjr.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606482/FullSizeRender_mzpgjp.mov', alt: 'Whidbey', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606479/IMG_8114_svdaqy.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606478/IMG_6733_smrpq6.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606477/IMG_6711_e130js.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606476/IMG_6707_acw3gx.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606474/IMG_5789_nvd9li.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606473/IMG_5785_pkn2lv.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606472/IMG_5784_hbdxxx.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606471/IMG_5772_twwcgf.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606468/IMG_5513_wfhfto.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606468/IMG_5062_cnkqoy.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606467/IMG_5067_d9hvif.mov', alt: 'Whidbey', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606466/IMG_5062_ggmoo9.mov', alt: 'Whidbey', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606463/IMG_3275_qhaycy.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606462/IMG_3274_suo6eb.mov', alt: 'Whidbey', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606460/IMG_2843_muvlec.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606460/IMG_1522_zk1qcr.mp4', alt: 'Whidbey', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606457/IMG_0951_tbnicd.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606456/IMG_0471_tcthpr.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606455/IMG_0453_yhpxtv.jpg', alt: 'Whidbey' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606455/IMG_0222_lgcjkc.jpg', alt: 'Whidbey' },
    ],
  },
  'europe': {
    title: 'Europe',
    subtitle: 'Adventures Across the Continent',
    date: 'June 11, 2025',
    description: 'From Swedish charm to Swiss Alps - our European adventure.',
    color: '#D4C4E8',
    photos: [
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606752/IMG_0758_qxmo30.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606813/IMG_0593_yv4scf.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606820/IMG_0751_grmnlr.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766606819/IMG_0678_qkon6p.mp4', alt: 'Europe', isVideo: true },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606816/IMG_0677_tsonp3.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606815/IMG_0676_jyfnck.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606812/IMG_0750_ddmgzq.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606810/IMG_0749_y625az.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606808/IMG_0748_prqclt.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606807/IMG_0747_g23ruq.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606805/IMG_0746_ccgkmp.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606804/IMG_0745_yg1emd.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606802/IMG_0744_kzm3yz.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606800/IMG_0743_twebym.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606799/IMG_0742_rxosk7.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606797/IMG_0741_yyj56e.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606795/IMG_0740_u4qy4r.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606794/IMG_0739_t2yb6j.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606792/IMG_0738_zcr3bg.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606791/IMG_0737_scyfjw.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606787/IMG_0735_ere2g9.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606786/IMG_0734_vj2cbg.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606784/IMG_0733_a2at7k.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606782/IMG_0732_cmibms.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606781/IMG_0731_jfuaik.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606779/IMG_0730_dutyth.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606777/IMG_0729_xnozw7.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606775/IMG_0728_v14iwb.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606774/IMG_0727_f0nruv.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606772/IMG_0715_yyfi94.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606772/IMG_0726_xnba7y.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606767/IMG_0926_jbtiey.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606765/IMG_0925_q2n3vx.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606764/IMG_0923_rouepg.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606762/IMG_0920_l016vj.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606761/IMG_0919_fs9dbn.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606759/IMG_0903_j8cbem.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606758/IMG_0880_bmwg5p.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606757/IMG_0863_j9ugzi.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606755/IMG_0765_uue904.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606753/IMG_0759_dyshca.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606752/IMG_0758_qxmo30.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606751/IMG_0757_k12rav.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606750/IMG_0756_q3srgm.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606748/IMG_0754_nzfdlb.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606748/IMG_0755_x8p6gt.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606745/IMG_0754_w0bgis.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606744/IMG_0753_k4elzc.jpg', alt: 'Europe' },
      { src: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606743/IMG_0752_ma1dgf.jpg', alt: 'Europe' },
    ],
  },
}

export default function MemoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const memory = memoryPages[slug]
  const [selectedPhoto, setSelectedPhoto] = useState<{ sectionIndex: number; photoIndex: number } | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [enlargedPostIt, setEnlargedPostIt] = useState<number | null>(null)
  const [canGoBack, setCanGoBack] = useState(false)

  // For formal events page with sections
  const hasSections = memory?.sections && memory.sections.length > 0

  // Check if we have history to go back to
  useEffect(() => {
    // If there's browser history (user navigated from another page), enable back button
    setCanGoBack(window.history.length > 1)
  }, [])

  // Handle hash navigation for sections (e.g., #tolo, #prom, #telluride)
  useEffect(() => {
    if (typeof window !== 'undefined' && hasSections) {
      const hash = window.location.hash.toLowerCase().replace('#', '')
      if (hash) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }
  }, [hasSections])

  const handleBack = () => {
    if (canGoBack) {
      router.back()
    } else {
      router.push('/')
    }
  }

  const handleImageError = (key: string) => {
    setFailedImages(prev => new Set(prev).add(key))
  }

  // Get the current selected photo data
  const getSelectedPhotoData = () => {
    if (!selectedPhoto || !memory) return null
    if (hasSections && memory.sections) {
      return memory.sections[selectedPhoto.sectionIndex]?.photos[selectedPhoto.photoIndex]
    }
    return memory.photos[selectedPhoto.photoIndex]
  }

  const selectedPhotoData = getSelectedPhotoData()

  if (!memory) {
    return (
      <main>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-[#1a1d23]">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white mb-4">Memory not found</h1>
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Use all photos from the memory
  const photos = memory.photos

  // Get hero image - use first section cover for pages with sections
  const heroImage = hasSections && memory.sections
    ? memory.sections[0].coverImage
    : photos[0]?.src

  return (
    <main className="bg-[#1a1d23] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${memory.color}40 0%, ${memory.color}15 50%, #1a1d23 100%)`
          }}
        />

        {/* Hero image */}
        {heroImage && (
          <Image
            src={heroImage}
            alt={memory.title}
            fill
            className="object-cover"
            style={{ objectPosition: memory.heroPosition || 'center center' }}
            priority
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] via-transparent to-transparent" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-24 left-8 z-10"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wider uppercase"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="inline-block px-4 py-1 mb-4 text-xs tracking-widest uppercase rounded-full"
              style={{ background: `${memory.color}40`, color: memory.color }}
            >
              {memory.date}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4">
              {memory.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/60 italic max-w-xl">
              {memory.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-8 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          {memory.description}
        </motion.p>
      </section>

      {/* Sections-based Gallery (for formal events) */}
      {hasSections && memory.sections ? (
        <section className="px-4 md:px-8 pb-20">
          <div className="max-w-7xl mx-auto space-y-20">
            {memory.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2
                    className="text-4xl md:text-5xl font-serif text-white mb-2"
                    style={{ color: memory.color }}
                  >
                    {section.title}
                  </h2>
                  <div
                    className="w-24 h-1 rounded-full"
                    style={{ background: memory.color }}
                  />
                </motion.div>

                {/* Section Gallery */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
                  {section.photos.map((photo, photoIndex) => {
                    const imageKey = `${sectionIndex}-${photoIndex}`
                    const isVideo = photo.isVideo

                    return (
                      <motion.div
                        key={photoIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: Math.min(photoIndex * 0.05, 0.2) }}
                        className={`mb-4 md:mb-6 break-inside-avoid ${failedImages.has(imageKey) ? 'hidden' : ''}`}
                      >
                        <div
                          className="relative rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => setSelectedPhoto({ sectionIndex, photoIndex })}
                        >
                          {isVideo ? (
                            <div className="relative">
                              <video
                                src={photo.src}
                                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                muted
                                playsInline
                                onError={() => handleImageError(imageKey)}
                              />
                              {/* Play icon overlay */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onError={() => handleImageError(imageKey)}
                              />
                            </>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Regular Photo Gallery - Polaroid Masonry Layout */
        <section className="px-4 md:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
              {photos.map((photo, index) => {
                // Check if this photo should have a post-it by matching the filename
                const photoKey = Object.keys(photosWithPostIts).find(key => photo.src.includes(key))
                const hasPostIt = photoKey !== undefined
                const isPolaroid = hasPostIt // Only photos with post-its get polaroid styling
                const rotation = isPolaroid ? ((index * 7) % 11) - 5 : 0 // Only rotate polaroids
                const postItIndex = photoKey ? photosWithPostIts[photoKey] : 0
                const postItPosition = ['top-left', 'top-right', 'bottom-left', 'bottom-right'][index % 4]
                const imageKey = `main-${index}`
                const isVideo = photo.isVideo

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: Math.min(index * 0.03, 0.2) }}
                    className={`mb-4 md:mb-6 break-inside-avoid ${failedImages.has(imageKey) ? 'hidden' : ''}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {isPolaroid ? (
                      /* Polaroid frame */
                      <div
                        className="relative bg-white p-2 pb-8 md:p-3 md:pb-12 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                        onClick={() => setSelectedPhoto({ sectionIndex: -1, photoIndex: index })}
                        style={{
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        {/* Photo inside polaroid */}
                        <div className="relative overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={() => handleImageError(imageKey)}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>

                        {/* Post-it overlay */}
                        {hasPostIt && (
                          <div
                            className={`absolute z-10 cursor-pointer transition-all duration-300 ${
                              enlargedPostIt === index
                                ? 'w-48 h-48 md:w-64 md:h-64 -top-16 -left-16 md:-top-24 md:-left-24 z-50'
                                : `w-[72px] h-[72px] md:w-24 md:h-24 ${
                                  postItPosition === 'top-left' ? '-top-3 -left-3 md:-top-4 md:-left-4' :
                                  postItPosition === 'top-right' ? '-top-3 -right-3 md:-top-4 md:-right-4' :
                                  postItPosition === 'bottom-left' ? '-bottom-3 -left-3 md:-bottom-4 md:-left-4' :
                                  '-bottom-3 -right-3 md:-bottom-4 md:-right-4'
                                }`
                            }`}
                            style={{
                              transform: enlargedPostIt === index ? 'rotate(0deg)' : `rotate(${((index * 13) % 30) - 15}deg)`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setEnlargedPostIt(enlargedPostIt === index ? null : index)
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={postItImages[postItIndex]}
                              alt=""
                              className="w-full h-full object-contain drop-shadow-lg"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Regular photo/video card */
                      <div
                        className="relative rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedPhoto({ sectionIndex: -1, photoIndex: index })}
                      >
                        {isVideo ? (
                          <div className="relative">
                            <video
                              src={photo.src}
                              className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                              muted
                              playsInline
                              onError={() => handleImageError(imageKey)}
                            />
                            {/* Play icon overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={() => handleImageError(imageKey)}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && selectedPhotoData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative cursor-default flex flex-col items-center"
            >
              {selectedPhotoData.isVideo ? (
                <video
                  src={selectedPhotoData.src}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={selectedPhotoData.src}
                  alt={selectedPhotoData.alt}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                />
              )}

              {selectedPhotoData.caption && (
                <div className="mt-4 text-center">
                  <p className="text-white/80 text-lg">{selectedPhotoData.caption}</p>
                </div>
              )}

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-0 right-0 -translate-y-full -mt-2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
