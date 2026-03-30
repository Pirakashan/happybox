<?php

namespace Database\Seeders;

use App\Models\ExploreNode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ExploreUsSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing data
        ExploreNode::query()->delete();

        // ============================================
        // 1. EVENT PLANNING & COORDINATION (ROOT)
        // ============================================
        $eventRoot = ExploreNode::create([
            'title' => 'Event Planning & Coordination',
            'slug' => 'event-planning-coordination',
            'description' => 'From intimate gatherings to grand celebrations, we plan and coordinate every detail to perfection.',
            'type' => 'root',
            'order_index' => 0,
        ]);

        // --- A. Personal Celebrations ---
        $personalGroup = ExploreNode::create([
            'parent_id' => $eventRoot->id,
            'title' => 'Personal Celebrations',
            'slug' => 'personal-celebrations',
            'description' => 'Celebrate life\'s most beautiful moments with expert planning and creative touches.',
            'type' => 'group',
            'order_index' => 0,
        ]);

        $personalEvents = [
            'Weddings', 'Engagement Ceremonies', 'Birthdays (Kids & Adults)',
            'Anniversaries', 'Surprise Parties', 'Private Parties', 'Proposal Setups',
        ];

        foreach ($personalEvents as $i => $event) {
            $cat = ExploreNode::create([
                'parent_id' => $personalGroup->id,
                'title' => $event,
                'slug' => Str::slug($event),
                'description' => "Professional planning and coordination for your {$event}.",
                'type' => 'category',
                'order_index' => $i,
            ]);
            $this->seedServiceGroups($cat);
        }

        // --- B. Traditional & Cultural Events ---
        $traditionalGroup = ExploreNode::create([
            'parent_id' => $eventRoot->id,
            'title' => 'Traditional & Cultural Events',
            'slug' => 'traditional-cultural-events',
            'description' => 'Honoring traditions with modern event management excellence.',
            'type' => 'group',
            'order_index' => 1,
        ]);

        $traditionalEvents = [
            'Puberty Ceremonies', 'House Opening / Housewarming',
            'Religious Ceremonies', 'Family Get-Togethers',
        ];

        foreach ($traditionalEvents as $i => $event) {
            $cat = ExploreNode::create([
                'parent_id' => $traditionalGroup->id,
                'title' => $event,
                'slug' => Str::slug($event),
                'description' => "Complete coordination and management for {$event}.",
                'type' => 'category',
                'order_index' => $i,
            ]);
            $this->seedServiceGroups($cat);
        }

        // --- C. Corporate & Business Events ---
        $corporateGroup = ExploreNode::create([
            'parent_id' => $eventRoot->id,
            'title' => 'Corporate & Business Events',
            'slug' => 'corporate-business-events',
            'description' => 'Professional event solutions for businesses and organizations.',
            'type' => 'group',
            'order_index' => 2,
        ]);

        $corporateEvents = [
            'Shop Openings', 'Business Launches', 'Annual Meetings',
            'Corporate Parties', 'Award Ceremonies', 'Conferences & Seminars',
        ];

        foreach ($corporateEvents as $i => $event) {
            $cat = ExploreNode::create([
                'parent_id' => $corporateGroup->id,
                'title' => $event,
                'slug' => Str::slug($event),
                'description' => "End-to-end management for {$event}.",
                'type' => 'category',
                'order_index' => $i,
            ]);
            $this->seedServiceGroups($cat);
        }

        // ============================================
        // 2. CUSTOMIZED GIFT SOLUTIONS (ROOT)
        // ============================================
        $giftRoot = ExploreNode::create([
            'title' => 'Customized Gift Solutions',
            'slug' => 'customized-gift-solutions',
            'description' => 'Bespoke gift boxes and customized presents designed to delight. From concept to delivery, we create magic.',
            'type' => 'root',
            'metadata' => [
                'whatsapp_number' => '+94771234567',
                'wa_message' => 'Hello, I would like to request a customized gift.',
            ],
            'order_index' => 1,
        ]);

        $gifts = [
            ['title' => 'Personalized Mugs', 'description' => 'Custom mugs with personalized messages, names, or photos printed for special occasions.'],
            ['title' => 'Custom Photo Frames', 'description' => 'Beautiful photo frames customized with engraved messages and premium finishing.'],
            ['title' => 'Name Engraved Gifts', 'description' => 'Elegant gifts with names or messages engraved for a personal touch.'],
            ['title' => 'Custom Gift Hampers', 'description' => 'Curated gift hampers with personalized selections based on recipient preferences.'],
            ['title' => 'Wedding Return Gifts', 'description' => 'Beautiful return gifts for wedding guests with couple\'s names and wedding date.'],
            ['title' => 'Birthday Gift Boxes', 'description' => 'Themed birthday gift boxes with custom decorations and personalized messages.'],
        ];

        $customizeOptions = [
            'Bespoke Jewelry', 'Engraved Accessories', 'Handwritten Notes',
            'Curated Treat Boxes', 'Themed Decorations', 'Event Favors',
            'Custom Packaging', 'Photo Albums', 'Personalized Clothing',
        ];

        foreach ($gifts as $i => $gift) {
            ExploreNode::create([
                'parent_id' => $giftRoot->id,
                'title' => $gift['title'],
                'slug' => Str::slug($gift['title']),
                'description' => $gift['description'],
                'type' => 'gift_item',
                'order_index' => $i,
            ]);
        }

        // Store customize options in metadata
        $giftRoot->update([
            'metadata' => array_merge($giftRoot->metadata ?? [], [
                'customize_options' => $customizeOptions,
            ]),
        ]);

        // ============================================
        // 3. PERSONAL SHOPPING & INTERNATIONAL DELIVERY (ROOT)
        // ============================================
        $deliveryRoot = ExploreNode::create([
            'title' => 'Personal Shopping & International Delivery',
            'slug' => 'personal-shopping-international-delivery',
            'description' => 'We bring Sri Lankan happiness to the world and international products to Sri Lanka with our trusted delivery network.',
            'type' => 'root',
            'metadata' => [
                'whatsapp_number' => '+94771234567',
                'wa_message' => 'Hello, I would like to request personal shopping and international delivery service.',
                'delivery_partner' => 'Arul Global Express',
            ],
            'order_index' => 2,
        ]);

        $infoSections = [
            [
                'title' => 'What We Do',
                'content' => "We offer a comprehensive personal shopping service that connects you with authentic Sri Lankan products and international brands.\n\nOur dedicated team sources products based on your specific requirements, from traditional Sri Lankan gifts to modern lifestyle items. Whether you're an overseas Sri Lankan looking to send gifts home, or a local customer wanting international products — we've got you covered.\n\nWe handle everything from product selection to secure packaging and international shipping, ensuring your items arrive safely at your doorstep.",
            ],
            [
                'title' => 'Delivery Process',
                'content' => "Step 1: Share Your Requirements\nContact us via WhatsApp or our website with details of what you need.\n\nStep 2: Product Sourcing & Confirmation\nOur team sources the products and shares photos/prices for your confirmation.\n\nStep 3: Secure Packaging\nItems are carefully packaged with premium materials to ensure safe transit.\n\nStep 4: International Shipping\nWe ship through our trusted courier partner with full tracking capabilities.\n\nStep 5: Doorstep Delivery\nYour package is delivered directly to the recipient with a personal touch.",
            ],
            [
                'title' => 'International Shipping Support',
                'content' => "We partner with Arul Global Express to provide reliable international shipping services.\n\nCoverage: Worldwide delivery to over 150+ countries\nTracking: Real-time package tracking from pickup to delivery\nInsurance: All shipments are insured for damage or loss\nCustoms: We handle all customs documentation and clearance\nBulk Orders: Special rates for bulk and corporate shipments\n\nOur shipping typically takes 5-10 business days depending on the destination. Express shipping options are also available for urgent deliveries.",
            ],
            [
                'title' => 'Sample Products We Source',
                'content' => "Traditional Sri Lankan Items:\n• Ceylon Tea collections & gift packs\n• Handcrafted wooden artifacts\n• Traditional sweet boxes (Kavum, Kokis, etc.)\n• Batik clothing and accessories\n• Ayurvedic products & herbal remedies\n• Gems & jewelry from Sri Lanka\n\nInternational Products:\n• Electronics & gadgets\n• Fashion & accessories\n• Health & wellness products\n• Baby products & toys\n• Home décor items",
            ],
        ];

        foreach ($infoSections as $i => $section) {
            ExploreNode::create([
                'parent_id' => $deliveryRoot->id,
                'title' => $section['title'],
                'slug' => Str::slug($section['title']) . '-delivery',
                'content' => $section['content'],
                'type' => 'info_section',
                'order_index' => $i,
            ]);
        }
    }

    /**
     * Seed the 7 service groups and their items for each event category
     */
    private function seedServiceGroups(ExploreNode $parent): void
    {
        $serviceGroups = [
            'Guest & Travel Services' => [
                'Airport pickup & drop-off arrangements',
                'VIP guest transportation',
                'Hotel booking coordination',
                'Travel itinerary assistance',
            ],
            'Venue & Setup Services' => [
                'Venue sourcing & booking',
                'Stage design & decoration',
                'Seating & table arrangements',
                'Lighting & sound system setup',
            ],
            'Vendor Coordination' => [
                'Catering services',
                'Photography & videography',
                'DJ & live entertainment',
                'Makeup artists & stylists',
                'Traditional ceremony specialists',
            ],
            'Event Experience Enhancements' => [
                'Customized backdrops',
                'LED screens & multimedia displays',
                'Fireworks & special effects',
                'Dance performances',
                'Emcee (MC) arrangements',
            ],
            'Documentation & Media' => [
                'Professional photography',
                'Cinematic event videography',
                'Drone coverage',
                'Live streaming for overseas family',
                'Same-day edited highlight videos',
            ],
            'Guest Management' => [
                'Invitation design & printing',
                'RSVP management',
                'Guest list coordination',
                'On-site reception desk',
                'Event day coordination team',
            ],
            'Overseas Client Support' => [
                'Virtual planning meetings',
                'Budget tracking & reporting',
                'Vendor payment handling',
                'Real-time event updates',
                'Photo & video proof delivery',
            ],
        ];

        $groupOrder = 0;
        foreach ($serviceGroups as $groupTitle => $services) {
            $group = ExploreNode::create([
                'parent_id' => $parent->id,
                'title' => $groupTitle,
                'slug' => Str::slug($parent->title . ' ' . $groupTitle),
                'description' => "Professional {$groupTitle} for your {$parent->title}.",
                'type' => 'service_group',
                'order_index' => $groupOrder++,
            ]);

            foreach ($services as $j => $service) {
                ExploreNode::create([
                    'parent_id' => $group->id,
                    'title' => $service,
                    'slug' => Str::slug($parent->title . ' ' . $service),
                    'description' => "Expert {$service} tailored to your needs.",
                    'content' => "Our {$service} service ensures a flawless experience for your {$parent->title}. We work with top professionals and use premium equipment to deliver results that exceed your expectations.\n\nOur dedicated team coordinates every detail, from planning to execution, ensuring everything runs smoothly on your special day. We provide real-time updates and handle all logistics so you can focus on enjoying the moment.",
                    'type' => 'service_item',
                    'order_index' => $j,
                ]);
            }
        }
    }
}
